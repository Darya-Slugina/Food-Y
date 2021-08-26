import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Dish } from './shared/models/food.model';

import { AuthService } from './shared/services/auth.service';
import { FoodService } from './shared/services/food.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // public dishes$: Observable<Dish[]> = of([]); // store

  constructor(
    private router: Router,
    private service: FoodService,
    private authUserService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.service.setDishesInStore(); // store
    // this.userService.getAllUsers();
    const user = localStorage.getItem('user');

    if (user) {
      // this.router.navigate(['']); //не пуска на еррор страница
      this.authUserService.setUserInfo(JSON.parse(user));
    } else {
      this.router.navigate(['/login']);
    }
  }
}
