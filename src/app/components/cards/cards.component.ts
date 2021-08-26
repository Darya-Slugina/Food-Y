import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/food.model';
import { User } from 'src/app/shared/models/user.model';
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
  dishes: Dish[];
  dishesToShow: Dish[] = [];
  inputValue: string = '';
  user: User;
  step: number = 1;
  start: number = 0;
  private destroy$ = new Subject();

  constructor(
    private service: FoodService,
    private router: Router,
    private userService: AuthService
  ) {}

  ngOnInit() {
    this.service.input.subscribe((res) => (this.inputValue = res));
    this.userService.userInfo.subscribe((res) => (this.user = res));
    this.inputValue = "";

    if(this.page === 'home'){
      this.service.dishesArray
      .pipe(filter((dishes) => dishes !== null), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.dishes = res;
        if (this.dishes.length) {
          for (let i = this.start; i < this.step; i++) {
            this.dishesToShow.push(this.dishes[i]);
          }
        }
      });
    } else {
      this.dishesToShow = this.dishesByRestaurant
    }
   
  }

  onClick(category, title) {
    this.router.navigate([`/menu/${category}/${title}`]);
    this.service._isFilterActive$.next(false);
  }

  onScroll() {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
