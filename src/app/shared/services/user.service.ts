import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataStorageService } from './api-food.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { Dish } from '../models/food.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { UserStorageService } from './api-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  //   private _dish$ = new BehaviorSubject<any>(null);
  //   public readonly dishes = this._dish$.asObservable();
  //   public readonly dishesArray = this._dish$
  //     .asObservable()
  //     .pipe(map((dish) => this.getFoodAsArray(dish)));

  //   public _input$ = new BehaviorSubject<any>(null);
  //   public readonly input = this._input$.asObservable();

  //   public _inputRes$ = new BehaviorSubject<any>(null);
  //   public readonly inputRes = this._inputRes$.asObservable();

  //   public _isFilterActive$ = new BehaviorSubject<any>(true);
  //   public readonly isFilterActive = this._isFilterActive$.asObservable();

  constructor(
    private authUserService: AuthService,
    private apiUserService: UserStorageService
  ) {
    this.authUserService.userInfo.subscribe((res) => (this.user = res));
  }

//   public addToFavouriteDish(dishId, userId): void {
//     console.log(dishId, userId, this.user, 'dishId');
//     this.user.favourites = [];
//     this.user.favourites.push(dishId);
//     console.log(this.user, 'new');

//     this.apiUserService.addNewUser(this.user, userId).subscribe((res) => {
//       console.log(res);
//     });

    // this.apiService.addNewMovie(movie).subscribe((res: Movie) => {
    //   const obj = {};
    //   obj[res.title] = res;
    //   this._movies$.next({
    //     ...this._movies$.value,
    //     ...obj,
    //   });
    // });
//   }

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

//   private getFoodAsArray(food: any) {
//     const resultArr = [];
//     for (let prop in food) {
//       resultArr.push(food[prop]);
//     }
//     return resultArr;
//   }
}
