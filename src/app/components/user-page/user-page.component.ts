import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Dish } from 'src/app/shared/interfaces/food.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public username: string;
  public user: any;
  public isEditProfileAllow: boolean = false;
  public dishes: Dish[] = [];
  private loggedInUser: User;
  private index: string;

  constructor(
    private service: FoodService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}

  public ngOnInit(): void {
    this.service._isFilterActive$.next(false);
    this.username = this.route.snapshot.paramMap.get('username');

    this.initUser(this.username);
    this.initDishes(this.username);
    this.isLoggedInUser(this.username);
  }

  public onStartChat() {
    this.router.navigate(['/users']);
  }

  private initUser(username): void {
    this.userService
      .getCurrentUser(username)
      .pipe(filter((res) => res !== undefined))
      .subscribe((res) => {
        this.user = res;
      });
  }

  private initDishes(username): void {
    this.service
      .getDishesByUser(username)
      .subscribe((res) => (this.dishes = res));
  }

  private isLoggedInUser(username): void {
    this.userService.getUser().subscribe((res) => {
      this.loggedInUser = res;
      if (this.loggedInUser.username === username) {
        this.isEditProfileAllow = true;
      }
    });
  }
}
