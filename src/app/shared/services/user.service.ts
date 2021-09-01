import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';
import { UserStorageService } from './api-user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;

  private _allUsers$ = new BehaviorSubject<any>(null);
  public readonly allUsers = this._allUsers$.asObservable();
  public readonly allUsersArray = this._allUsers$
    .asObservable()
    .pipe(map((users) => this.getUsersAsArray(users)));

  constructor(
    private authUserService: AuthService,
    private apiUserService: UserStorageService,
    public afAuth: AngularFireAuth
  ) {
    this.getAllUsers();
  }

  public getUser(): Observable<User> {
    return this.authUserService.userInfo.pipe(filter((user) => user !== null));
  }

  public getAllUsers(): void {
    this.apiUserService
      .fetchUsers()
      // .pipe(shareReplay())
      // .pipe(filter((users) => users !== null))
      .subscribe((users) => {
        this._allUsers$.next(users);
      });
  }

  public getCurrentUser(username): Observable<User> {
    return this.allUsersArray.pipe(
      filter((users) => users !== null),
      map((users) => users.find((item) => item.username === username))
    );
  }

  public isDishInFavourite(dishId: number): Observable<boolean> {
    return this.authUserService.userInfo.pipe(
      filter((user) => user !== null),
      map((user) => {
        if (user.favourites) {
          return user.favourites.includes(dishId);
        }
      })
    );
  }

  public addToFavouriteDish(dishId, userId): void {
    let user: User;
    this.authUserService.userInfo.subscribe((res) => (user = res));

    if (user.favourites) {
      user.favourites.push(dishId);
    } else {
      user.favourites = [];
      user.favourites.push(dishId);
    }

    this.apiUserService.addNewUser(user, userId).subscribe((User) => {
      this.authUserService.updateUserInfo(User);
    });
  }

  public deleteFromFavouriteDish(dishId, userId): void {
    let user: User;
    this.authUserService.userInfo.subscribe((res) => (user = res));

    let newUser = user.favourites.filter((item) => item !== dishId);
    user.favourites = newUser;

    this.apiUserService.addNewUser(user, userId).subscribe((res) => {
      this.authUserService.updateUserInfo(res);
    });
  }

  public isSelfComment(currentDish): Observable<Comment> | Observable<null> {
    return this.authUserService.userInfo.pipe(
      filter((user) => user !== null),
      map((user) => {
        if (currentDish.comments) {
          return currentDish.comments.find(
            (item) => item.postedBy === user.username
          );
        } else {
          return null;
        }
      })
    );
  }

  public isSelfDish(currentDish): Observable<boolean> {
    return this.authUserService.userInfo.pipe(
      filter((user) => user !== null),
      map((user) => {
        if (currentDish.postedBy === user.username) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  public changeUserInfo(
    userObj: any,
    favourites: number[],
    email: string,
    password: string
  ): void {
    let newUser = {
      username: userObj.username,
      email: userObj.email,
      userImg: userObj.img,
      favourites: favourites,
      country: userObj.country,
      liked: userObj.liked,
      about: userObj.about,
    };
    let userId = JSON.parse(localStorage.getItem('user'));

    let user;
    this.afAuth.onAuthStateChanged((res) => {
      user = res;

      if (user.email !== userObj.email) {
        this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then(function (userCredential) {
            userCredential.user.updateEmail(userObj.email);
          });
      }
    });

    this.apiUserService.updateUser(newUser, userId).subscribe((res) => {
      this.authUserService.setUserInfo(userId);

      const obj = {};
      obj[userId] = res;
      this._allUsers$.next({
        ...this._allUsers$.value,
        ...obj,
      });
    });
  }

  private getUsersAsArray(users): User[] {
    const resultArr = [];
    for (let prop in users) {
      resultArr.push(users[prop]);
    }
    return resultArr;
  }
}
