import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RestaurantComponent implements OnInit {
  title: string;
  @Output() dishes: Dish[] = [];

  constructor(private route: ActivatedRoute, private service: FoodService) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('restaurant');

    this.service
      .getFoodByRestaurant(this.title)
      .subscribe((res) => (this.dishes = res));
  }
}
