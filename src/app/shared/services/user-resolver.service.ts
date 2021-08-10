import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User> {
  public user: User;

  constructor(private authUserService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authUserService.userInfo
      .pipe(filter((user) => user !== null))
      .subscribe((res) => {
        this.user = res;
      });

    if (!this.user) {
      const user = localStorage.getItem('user');
      if (user) {
        this.authUserService.setUserInfo(JSON.parse(user));
        this.authUserService.userInfo
          .pipe(filter((user) => user !== null))
          .subscribe((res) => {
            this.user = res;
          });
        return this.user;
      }
      return null;
    } else {
      return this.user;
    }
  }
}
