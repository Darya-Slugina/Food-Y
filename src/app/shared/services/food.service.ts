import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, share, shareReplay, tap } from 'rxjs/operators';
import { DataStorageService } from './api-food.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { Dish } from '../models/food.model';
// import { Store } from '@ngrx/store'; //store
// import { addComment, setDishes } from 'src/app/store/food.actions';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private _dish$ = new BehaviorSubject<any>(null);
  public readonly dishes = this._dish$.asObservable();
  public readonly dishesArray = this._dish$
    .asObservable()
    .pipe(map((dish) => this.getFoodAsArray(dish)));

  public _input$ = new BehaviorSubject<any>(null);
  public readonly input = this._input$.asObservable();

  public _inputRes$ = new BehaviorSubject<any>(null);
  public readonly inputRes = this._inputRes$.asObservable();

  public _isFilterActive$ = new BehaviorSubject<any>(true);
  public readonly isFilterActive = this._isFilterActive$.asObservable();

  // public dishes$: Observable<Dish[]> = of([]); // store
  // service: any;
  user: User;

  private isLoading$ = new BehaviorSubject<boolean>(false);
  public readonly isLoading = this.isLoading$.asObservable();

  constructor(
    private apiService: DataStorageService,
    private autUserService: AuthService // private store: Store<{ dishes: Dish[] }> //store
  ) {
    // this.dishes$ = this.store.select('dishes');
    this.setDishes();
    this.autUserService.userInfo.subscribe((res) => (this.user = res));
  }

  public setDishes(): void {
    this.isLoading$.next(true);

    this.apiService
      .fetchFoods()
      .pipe(tap(() => this.isLoading$.next(false)))
      .subscribe((foods) => {
        this._dish$.next(foods);
        this.isLoading$.next(false);
      });
  }

  // --------Store ---------------
  // public setDishesInStore():void {
  //   this.apiService.fetchFoods()
  //   .subscribe((foods) => {
  //     let Foods = this.getFoodAsArray(foods)
  //     this.store.dispatch(setDishes({ Foods }))
  //   })
  // }

  public getFoodByRestaurant(restaurant: string): Observable<any> {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => {
        const filteredData = foods.filter((item) => {
          return item.restaurant === restaurant;
        });
        return filteredData;
      })
    );
  }

  public getDishesByUser(username: string): Observable<any> {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => {
        const filteredData = foods.filter((item) => {
          return item.postedBy === username;
        });
        return filteredData;
      })
    );
  }

  public getResaturants() {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => {
        let all = foods.map((item) => item.restaurant);
        var mySet = new Set(all);
        return Array.from(mySet);
      })
    );
  }

  public getFoodsByCategory(category: string): Observable<any> {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => foods.filter((item) => item.category === category))
    );
  }

  public getCurrentDish(dishTitle: string): Observable<any> {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => foods.find((item) => item.title === dishTitle))
    );
  }

  public getFavouritesDishes(favouriteFoodsId: number[]): Observable<any> {
    return this.dishesArray.pipe(
      filter((foods) => foods !== null),
      map((foods) => foods.filter((item) => favouriteFoodsId.includes(item.id)))
    );
  }

  public addCommentToDish(
    NewComment: Comment,
    DishTitle: string,
    commentId: number
  ): void {
    // this.store.dispatch(addComment({NewComment, DishTitle})) // store

    this.apiService
      .addComment(NewComment, DishTitle, commentId)
      .subscribe((newComment: Comment) => {
        const dishes = this._dish$.value;
        let currentDish = dishes[DishTitle];
        if (currentDish.comments) {
          currentDish.comments[commentId] = newComment;
        } else {
          currentDish.comments = [];
          currentDish.comments[commentId] = newComment;
        }

        this._dish$.next(dishes);
      });
  }

  public deleteComment(dishTitle: string, index: number): void {
    this.apiService.deleteComment(dishTitle, index).subscribe();
    const dishes = this._dish$.value;
    const currentDish = dishes[dishTitle];
    currentDish.comments.splice(index, 1);

    this._dish$.next(dishes);
  }

  public addNewDish(dish: any): void {
    let arrIngredients = dish.ingredients.split(/[ ,]+/);

    let newDish = {
      id: Date.now(),
      title: dish.title,
      img: dish.img,
      ingredients: arrIngredients,
      price: dish.price,
      currency: 'lv',
      restaurant: dish.restaurant,
      location: dish.address,
      rating: dish.rating,
      category: dish.category.toLowerCase(),
      description: dish.description,
      postedBy: this.user.username,
      postedByImg: this.user.userImg,
      comments: [],
    };

    this.apiService.addDish(newDish).subscribe((res: Dish) => {
      const obj = {};
      obj[res.title] = res;
      this._dish$.next({
        ...this._dish$.value,
        ...obj,
      });
    });
  }

  public editDish(dish: any, id: number): void {
    let arrIngredients;
    if (Array.isArray(dish.ingredients)) {
      arrIngredients = dish.ingredients;
    } else {
      arrIngredients = dish.ingredients.split(/[ ,]+/);
    }

    let editedDish = {
      id: id,
      title: dish.title,
      img: dish.img,
      ingredients: arrIngredients,
      price: dish.price,
      currency: 'lv',
      restaurant: dish.restaurant,
      location: dish.address,
      rating: dish.rating,
      category: dish.category,
      description: dish.description,
      postedBy: this.user.username,
      postedByImg: this.user.userImg,
      comments: dish.comments,
    };

    this.apiService.addDish(editedDish).subscribe((res: Dish) => {
      const obj = {};
      obj[res.title] = res;
      this._dish$.next({
        ...this._dish$.value,
        ...obj,
      });
    });
  }

  public getDish(title: string): Observable<Dish> {
    return this._dish$.pipe(
      filter((dishes) => dishes !== null),
      map((dishes) => dishes[title])
    );
  }

  public deleteDish(title: string): void {
    this.apiService.deleteDish(title).subscribe(() => {
      const currentDish = this._dish$.value;
      delete currentDish[title];
      this._dish$.next(currentDish);
    });
  }

  public getFoodAsArray(food: any) {
    const resultArr = [];
    for (let prop in food) {
      resultArr.push(food[prop]);
    }
    return resultArr;
  }
}
