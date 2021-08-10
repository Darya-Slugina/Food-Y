import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserStorageService } from './api-user.service';
import firebase from 'firebase/app';
import { Store } from '@ngrx/store';
// import { setUser } from 'src/app/store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userInfo$ = new BehaviorSubject<any>(null);
  public readonly userInfo = this._userInfo$.asObservable();

  public user$: Observable<User> = of();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private apiUserService: UserStorageService,
    private userStore: Store<{ user: User }>
  ) {
    this.user$ = this.userStore.select('user');
  }

  signUp(form) {
    return this.afAuth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        var user = res.user;
        let userId = user.uid;
        let userObj: User = {
          email: user.email,
          username: form.username,
          userImg:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easiest-ever-fruit-and-coconut-ice-cream-1589550075.jpg',
          favourites: [],
        };
        this.apiUserService.addNewUser(userObj, userId).subscribe((res) => {
          this._userInfo$.next(res);
        });
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => window.alert(error.message));
  }

  signIn(form) {
    return this.afAuth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        this.getUser();
        this.router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid;
        localStorage.setItem('user', JSON.stringify(userId));
        this.setUserInfo(userId);
        this.router.navigate(['']);
      } else {
        localStorage.setItem('user', '');
        this.router.navigate(['/login']);
      }
    });
  }

  setUserInfo(userId) {
    this.apiUserService.fetchUser(userId).subscribe((User) => {
      // this.userStore.dispatch(setUser({ User }));
      this._userInfo$.next(User);
    });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', '');
      this._userInfo$.next('');
      this.router.navigate(['/login']);
    });
  }

  addToFavouriteDish(dishId, userId): void {
    let user: User;
    this.userInfo.subscribe((res) => (user = res));

    if (user.favourites) {
      user.favourites.push(dishId);
    } else {
      user.favourites = [];
      user.favourites.push(dishId);
    }

    this.apiUserService.addNewUser(user, userId).subscribe((User) => {
      this._userInfo$.next({
        ...this._userInfo$.value,
        ...User,
      });
    });
  }

  deleteFromFavouriteDish(dishId, userId) {
    let user: User;
    this.userInfo.subscribe((res) => (user = res));

    let newUser = user.favourites.filter((item) => item !== dishId);
    user.favourites = newUser;

    this.apiUserService.addNewUser(user, userId).subscribe((res) => {
      this._userInfo$.next({
        ...this._userInfo$.value,
        ...res,
      });
    });
  }
}
