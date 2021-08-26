import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/food.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FavouritesComponent implements OnInit {
  // public dishes$: Observable<Dish[]> = of([]); // store
  public favouriteFoodsId: number[];
  public dishes: Dish[];
  public favourite: Dish[];
  public inputValue: string;
  public isLoading: boolean = true;
  public isInfoVisible: boolean = false;
  public isFiltersVisible: boolean = false;
  public selectedItem: number;
  public ascendingRating: boolean = true;
  public ascendingPrice: boolean = true;
  public ascendingTitle: boolean = true;
  public toggleCategory: boolean = false;
  message: string = '';
  private destroy$ = new Subject();

  constructor(
    private authUserService: AuthService,
    private service: FoodService,
    private route: ActivatedRoute, // private store: Store<{ dishes: Dish[] }> //store
    private userService: UserService
  ) {}

  ngOnInit() {
    this.service.dishesArray.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.dishes = res;
    });

    // this.dishes$ = this.store.select('dishes'); // with store
    this.service.input.subscribe((res) => (this.inputValue = res));
    this.service._isFilterActive$.next(false);

    this.authUserService.userInfo
      .pipe(filter((user) => user !== null))
      .subscribe((res) => {
        this.favouriteFoodsId = res.favourites;
        if (this.favouriteFoodsId) {
          this.service
            .getFavouritesDishes(this.favouriteFoodsId)
            .subscribe((res) => {
              this.favourite = res;
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
        }
        // ------- With store ---------
        // this.favourite = [];
        // this.dishes$.subscribe((res) => {
        //   this.favourite = res.filter((item) => this.favouriteFoodsId.includes(item.id));
        //   this.isLoading = false;
        // });
        //   } else {
        //     this.isLoading = false;
        //   }
      });
  }

  onShowInfo(index) {
    this.isInfoVisible = !this.isInfoVisible;
    this.selectedItem = index;
  }

  onHideInfo() {
    this.isInfoVisible = !this.isInfoVisible;
  }

  deleteFromFavourites(dishId) {
    let userId = JSON.parse(localStorage.getItem('user'));
    this.userService.deleteFromFavouriteDish(dishId, userId);
    this.isInfoVisible = false;
  }

  sortDishes(prop, type) {
    // this.ascendingRating = !this.ascendingRating
    if (prop === 'rating' && type === true) {
      this.favourite.sort((a: Dish, b: Dish) => (a[prop] > b[prop] ? 1 : -1));
    } else if (prop === 'rating' && type === false) {
      this.favourite.sort((a: Dish, b: Dish) => (a[prop] > b[prop] ? -1 : 1));
    } else if (prop === 'title' && type === true) {
      this.favourite.sort((a: Dish, b: Dish) =>
        a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1
      );
    } else if (prop === 'title' && type === false) {
      this.favourite.sort((a: Dish, b: Dish) =>
        a[prop].toLowerCase() > b[prop].toLowerCase() ? -1 : 1
      );
    } else if (prop === 'price' && type === true) {
      this.favourite.sort((a: Dish, b: Dish) => (a[prop] > b[prop] ? 1 : -1));
    } else {
      this.favourite.sort((a: Dish, b: Dish) => (a[prop] > b[prop] ? -1 : 1));
    }
  }

  onCategoryChoise(event) {
    let category = event.target.innerText;
    let favourite = this.dishes.filter((item) =>
      this.favouriteFoodsId.includes(item.id)
    );
    let filtering = favourite.filter((dish) => dish.category === category);
    if (category === 'none') {
      this.favourite = favourite;
    } else {
      this.favourite = filtering;
    }
  }

  // ------- With store ---------
  // let favourite = [];
  // let filtering = [];
  // this.dishes$.subscribe((res) => {
  //   favourite = res.filter((item) => this.food.includes(item.id));
  //   filtering = favourite.filter((dish) => dish.category === category);
  //   if (category === 'none') {
  //     this.favourite = favourite;
  //   } else {
  //     this.favourite = filtering;
  //   }
  // });

  clearFilters() {
    this.favourite = this.dishes.filter((item) =>
      this.favouriteFoodsId.includes(item.id)
    );

    // ------- With store ---------
    // this.dishes$.subscribe((res) => {
    //   this.favourite = res.filter((item) => this.food.includes(item.id));
    // });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
