import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Dish } from '../../shared/interfaces/food.interface';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/food.service';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [FilterPipe],
  encapsulation: ViewEncapsulation.None,
})
export class CardsComponent implements OnInit, OnDestroy {
  @Input() page: string;
  @Input() dishesByRestaurant: Dish[];
  public dishes: Dish[];
  public dishesToShow: Dish[] = [];
  public inputValue: string = '';
  public user: User;
  public restaurant: string;
  private step: number = 1;
  private start: number = 0;
  private destroy$ = new Subject();

  constructor(
    private service: FoodService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {}

  public ngOnInit() {
    this.service.input.subscribe((res) => (this.inputValue = res));
    this.userService.userInfo.subscribe((res) => (this.user = res));
    this.inputValue = '';

    if (this.page === 'home') {
      this.initDishes();
    } else {
      this.initDishesByRestaurant();
    }
  }

  public onClick(category, title): void {
    this.router.navigate([`/menu/${category}/${title}`]);
    this.service._isFilterActive$.next(false);
  }

  public onScroll(): void {
    if (this.step < this.dishes.length) {
      this.step += 1;
      this.start += 1;

      for (let i = this.start; i < this.step; i++) {
        this.dishesToShow.push(this.dishes[i]);
      }
    } else {
      this.dishesToShow = this.dishes;
    }
  }

  private initDishes(): void {
    this.service.dishesArray
    .pipe(
      filter((dishes) => dishes !== null),
      takeUntil(this.destroy$)
    )
    .subscribe((res) => {
      this.dishes = res;
      if (this.dishes.length) {
        for (let i = this.start; i < this.step; i++) {
          this.dishesToShow.push(this.dishes[i]);
        }
      }
    });
  }

  private initDishesByRestaurant(): void {
    this.restaurant = this.route.snapshot.paramMap.get('restaurant');
    this.service.getFoodByRestaurant(this.restaurant).subscribe((res) => {
      this.dishesToShow = res;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
