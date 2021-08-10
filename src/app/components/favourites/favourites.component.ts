import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/food.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FavouritesComponent implements OnInit {
  public dishes$: Observable<Dish[]> = of([]);
  public food: number[];
  // public dishes: Dish[];
  public favourite: any;
  inputValue: string;
  public isLoading: boolean = true;
  public isInfoVisible: boolean = false;
  public isFiltersVisible: boolean = false;
  public selectedItem: number;
  public ascendingRating: boolean = true;
  public ascendingPrice: boolean = true;
  public ascendingTitle: boolean = true;
  public selected = 'main';
  public toggleCategory: boolean = false;

  constructor(
    private authUserService: AuthService,
    private service: FoodService,
    private store: Store<{ dishes: Dish[] }>
  ) {}

  ngOnInit() {
    this.dishes$ = this.store.select('dishes');
    this.service.input.subscribe((res) => (this.inputValue = res));
    this.service._isFilterActive$.next(false);

    this.authUserService.userInfo
      .pipe(filter((user) => user !== null))
      .subscribe((res) => {
        this.food = res.favourites;

        if (this.food) {
          this.favourite = [];
          this.dishes$.subscribe((res) => {
            this.favourite = res.filter((item) => this.food.includes(item.id));
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
        }
      });
  }

  onShowInfo(index) {
    this.isInfoVisible = !this.isInfoVisible;
    this.selectedItem = index;
  }

  onHideInfo() {
    console.log(111);

    this.isInfoVisible = !this.isInfoVisible;
  }

  deleteFromFavourites(dishId) {
    let userId = JSON.parse(localStorage.getItem('user'));
    this.authUserService.deleteFromFavouriteDish(dishId, userId);
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
    let favourite = [];
    let filtering = [];
    this.dishes$.subscribe((res) => {
      favourite = res.filter((item) => this.food.includes(item.id));
      filtering = favourite.filter((dish) => dish.category === category);
      if (category === 'none') {
        this.favourite = favourite;
      } else {
        this.favourite = filtering;
      }
    });
  }

  clearFilters() {
    this.dishes$.subscribe((res) => {
      this.favourite = res.filter((item) => this.food.includes(item.id));
    });
  }
}
