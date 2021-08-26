import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserStorageService } from './api-user.service';
import firebase from 'firebase/app';
// import { Store } from '@ngrx/store'; //store
import { filter, map } from 'rxjs/operators';
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
    // private userStore: Store<{ user: User }> // store
  ) {
    // this.user$ = this.userStore.select('user'); // store
  }

  public signUp(form) {
    return this.afAuth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        var user = res.user;
        let userId = user.uid;
        let userObj: User = {
          email: user.email,
          username: form.username,
          userImg:
            'https://firebasestorage.googleapis.com/v0/b/foody-21ab7.appspot.com/o/NicePng_user-icon-png_1280406.png?alt=media&token=a591940d-219f-4c7d-b1b7-b05b1faaae3e',
          favourites: [],
        };
        this.apiUserService.addNewUser(userObj, userId).subscribe((res) => {
          this._userInfo$.next(res);
        });
      })
      .then(() => {
        this.getUserFromFB();
      })
      .catch((error) => window.alert(error.message));
  }

  public signIn(form) {
    return this.afAuth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        this.getUserFromFB();
        this.router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with Facebook
  public FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  public AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getUserFromFB() {
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

  public setUserInfo(userId) {  
    this.apiUserService.fetchUser(userId).subscribe((User) => {
      // this.userStore.dispatch(setUser({ User })); // store      
      this._userInfo$.next(User);
    });
  }

  public signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', '');
      this._userInfo$.next('');
      this.router.navigate(['/login']);
    });
  }

  public updateUserInfo(value) {
    this._userInfo$.next({
      ...this._userInfo$.value,
      ...value,
    });
  }
}
