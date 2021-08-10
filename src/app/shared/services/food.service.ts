import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataStorageService } from './api-food.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { Dish } from '../models/food.model';
import { Store } from '@ngrx/store';
import { addComment, setDishes } from 'src/app/store/food.actions';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // private _dish$ = new BehaviorSubject<any>(null);
  // public readonly dishes = this._dish$.asObservable();
  // public readonly dishesArray = this._dish$
  //   .asObservable()
  //   .pipe(map((dish) => this.getFoodAsArray(dish)));

  public _input$ = new BehaviorSubject<any>(null);
  public readonly input = this._input$.asObservable();

  public _inputRes$ = new BehaviorSubject<any>(null);
  public readonly inputRes = this._inputRes$.asObservable();

  public _isFilterActive$ = new BehaviorSubject<any>(true);
  public readonly isFilterActive = this._isFilterActive$.asObservable();

  public dishes$: Observable<Dish[]> = of([]);
  service: any;

  constructor(
    private apiService: DataStorageService,
    private store: Store<{ dishes: Dish[] }>
  ) {
    this.dishes$ = this.store.select('dishes');
  }


  public setDishesInStore():void {
    this.apiService.fetchFoods()
    .subscribe((foods) => {
      let Foods = this.getFoodAsArray(foods)
      this.store.dispatch(setDishes({ Foods }))
    })
  }

  public getFoodByRestaurant(restaurant: string): Observable<any> {
    return this.dishes$.pipe(
        filter((foods) => foods !== null),
        map((foods) => {
          const filteredData = foods.filter((item) => {
            return item.restaurant === restaurant;
          });
          return filteredData;
        })
      );
  }

  public getResaturants() {
    return this.dishes$.pipe(
      filter((foods) => foods !== null),
      map((foods) => {
        let all = foods.map((item) => item.restaurant);
        var mySet = new Set(all);
        return Array.from(mySet);
      })
    );
  }

  public getFoodsByCategory(category: string): Observable<any> {
    return this.dishes$.pipe(
      filter((foods) => foods !== null),
      map((foods) => foods.filter((item) => item.category === category))
    );
  }

  public getCurrentDish(dishTitle: string): Observable<any> {
    return this.dishes$.pipe(
      filter((foods) => foods !== null),
      map((foods) => foods.find((item) => item.title === dishTitle))
    );
  }

  public addCommentToDish(
    NewComment: Comment,
    DishTitle: string,
    commentId: number
  ): void {

    this.store.dispatch(addComment({NewComment, DishTitle}))
    this.apiService
      .addComment(NewComment, DishTitle, commentId)
      .subscribe((res: Comment) => {
        let dish: Dish;
        this.service.getCurrentDish(DishTitle).subscribe((res) => (dish = res));
        if (dish.comments) {
          dish.comments[commentId] = res;
        } else {
          dish.comments = [];
          dish.comments[commentId] = res;
        }

        // this._dish$.next({
        //   ...this._dish$.value,
        //   ...dish,
        // });

        // this.apiService.fetchFoods().subscribe((foods) => {
        //   let Foods = this.getFoodAsArray(foods);
        //   this.store.dispatch(setDishes({ Foods }));
        // });
      });

    // let NewComment = comment

    // this.store.dispatch(addComment({NewComment, DishTitle}))
  }

  // public addMovie(movie: Movie): void {
  //   console.log(movie, 'add');
  //   this.apiService.addNewMovie(movie).subscribe((res: Movie) => {
  //     const obj = {};
  //     obj[res.title] = res;
  //     this._movies$.next({
  //       ...this._movies$.value,
  //       ...obj,
  //     });
  //   });
  // }

  // public getMovie(title: string): Observable<Movie> {
  //   return this._movies$.pipe(
  //     filter((movies) => movies !== null),
  //     map(movies => movies[title]))
  // }

  // public deleteMovie(title: string): void {
  //   this.apiService.deleteMovie(title).subscribe(() => {
  //     const currentMovies = this._movies$.value;
  //     delete currentMovies[title];
  //     this._movies$.next(currentMovies);
  //   });
  // }

  public getFoodAsArray(food: any) {
    const resultArr = [];
    for (let prop in food) {
      resultArr.push(food[prop]);
    }
    return resultArr;
  }
}
