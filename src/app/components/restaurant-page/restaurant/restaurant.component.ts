import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RestaurantComponent implements OnInit, OnDestroy {
  title: string;
  @Output() dishes: Dish[] = [];
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('restaurant');

    this.service.dishesArray
      .pipe(filter((dishes) => dishes !== null), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.dishes = res;
      });

    this.service
      .getFoodByRestaurant(this.title)
      .subscribe((res) => (this.dishes = res));
  }

  changeRoute() {
    this.router.navigate([`/restaurant/${this.title}/info`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
