import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/food.model';
import { User } from 'src/app/shared/models/user.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  username: string;
  user: any;
  isEditProfileAllow: boolean = false;
  loggedInUser: User;
  dishes: Dish[] = [];

  constructor(
    private service: FoodService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');

    this.initUser(this.username);

    this.service.getDishesByUser(this.username).subscribe(res => this.dishes = res)

    this.userService.getUser().subscribe((res) => {
      this.loggedInUser = res;
      if (this.loggedInUser.username === this.username) {
        this.isEditProfileAllow = true;
      }
    });

    this.service._isFilterActive$.next(false);
  }

  private initUser(username) {
    this.userService
      .getCurrentUser(username)
      .pipe(filter((res) => res !== undefined))
      .subscribe((res) => {
        this.user = res;
      });
  }
}
