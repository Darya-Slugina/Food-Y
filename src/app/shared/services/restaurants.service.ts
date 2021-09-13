import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dish } from '../interfaces/food.interface';
import { RestaurantInfo } from '../interfaces/restaurant-info.interface';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  public dishes: Dish[];

  constructor(private service: FoodService) {}

  public getDataForRestaurants(): Observable<RestaurantInfo[]> {
    return this.service.dishesArray.pipe(
      filter((dishes) => dishes !== null),
      map((res) => {
        this.dishes = res;

        const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

        let ratings = [];
        let addresses = [];
        let lat = [];
        let lng = [];
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
          lat[item.restaurant] = item.lat;
          lng[item.restaurant] = item.lng;
          count[item.restaurant].push(item.title);
        });

        let newObjects = [];
        for (let restarantName in ratings) {
          let restatantRating = ratings[restarantName];          
          let avgRating = average(restatantRating);

          let newObj = {
            restaurant: restarantName,
            address: addresses[restarantName],
            lat: lat[restarantName],
            lng: lng[restarantName],
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
