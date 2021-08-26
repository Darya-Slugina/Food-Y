import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss'],
})
export class RestaurantInfoComponent implements OnInit {
  title: string;
  dishes: Dish[];
  restaurantsInfo: any;

  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private restaurantService: RestaurantsService
  ) {}

  ngOnInit() {
    this.service._isFilterActive$.next(false);
    this.title = this.route.snapshot.paramMap.get('restaurant');

    this.restaurantService
      .getDataForRestaurants()
      .subscribe((res) => {
        this.restaurantsInfo = res.find(item => item.restaurant === this.title)
      });
  }
}
