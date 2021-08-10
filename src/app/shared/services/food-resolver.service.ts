import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../models/food.model';
import { DataStorageService } from './api-food.service';
import { FoodService } from './food.service';

@Injectable({ providedIn: 'root' })
export class FoodResolverService implements Resolve<Dish[]> {
  public dishes$: Observable<Dish[]> = of([]);
  dishes: Dish[];

  constructor(
    private store: Store<{ dishes: Dish[] }>,
    private service: FoodService,
    private apiFoodService: DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apiFoodService.fetchFoods().pipe(
      map(dishes => this.service.getFoodAsArray(dishes))
    );

    // this.dishes$ = this.store.select('dishes');
    // return this.dishes$.pipe((dishes) => {
      
    //   if (dishes.length) {
    //     return this.apiFoodService
    //       .fetchFoods()
    //       .pipe(map((dishes) => this.service.getFoodAsArray(dishes)));
    //   } else {
    //     return this.dishes$;
    //   }
    // });
  }
}
