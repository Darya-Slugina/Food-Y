import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dish } from 'src/app/shared/models/food.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private service: FoodService,
    private authUserService: AuthService
  ) {}

  ngOnInit() {
    this.authUserService.userInfo.subscribe((res) => (this.user = res))
  }

  onInput(event): void {
    let inputValue = event.target.value;
    this.service._input$.next(inputValue);
  }

  onHomeClick() {
    this.service._isFilterActive$.next(true);
  }

  onMenuClick() {
    this.service._isFilterActive$.next(false);
  }

  onImgClick() {
    this.authUserService.signOut();
  }
}
