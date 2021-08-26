import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Dish } from '../models/food.model';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  dishes: Dish[];

  constructor(private service: FoodService) {}

  getDataForRestaurants() {
    return this.service.dishesArray.pipe(
      filter((dishes) => dishes !== null),
      map((res) => {
        this.dishes = res;

        const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

        let ratings = [];
        let addresses = [];
        let count = [];
        this.dishes.forEach((item) => {
          if (ratings[item.restaurant] === undefined) {
            ratings[item.restaurant] = [];
          }
          if (count[item.restaurant] === undefined) {
            count[item.restaurant] = [];
          }
          
          ratings[item.restaurant].push(item.rating);
          addresses[item.restaurant] = item.location;
          count[item.restaurant].push(item.title);
        });

        let newObjects = [];
        for (let restarantName in ratings) {
          let restatantRating = ratings[restarantName];          
          let avgRating = average(restatantRating);

          let newObj = {
            restaurant: restarantName,
            address: addresses[restarantName],
            rating: avgRating.toFixed(1),
            dishes: count[restarantName].length,
          };

          newObjects.push(newObj);
        }
        return newObjects;
      })
    );
  }
}
