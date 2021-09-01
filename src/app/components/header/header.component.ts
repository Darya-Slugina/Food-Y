import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/shared/interfaces/food.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public user: User;
  public isMenuVisible: boolean = false;

  constructor(
    private service: FoodService,
    private router: Router,
    private authUserService: AuthService
  ) {}

  ngOnInit() {
    this.authUserService.userInfo.subscribe((res) => (this.user = res));
  }

  public onInput(event): void {
    let inputValue = event.target.value;
    this.service._input$.next(inputValue);
  }

  public onHomeClick(): void {
    this.service._isFilterActive$.next(true);
  }

  public onMenuClick(): void {
    this.service._isFilterActive$.next(false);
  }

  public onChatClick():void {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`users`]);
  });
  }

  public onImgClick(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  public onBlur(): void {
    this.isMenuVisible = false;  
  }

  public onLogOut(): void {
    this.authUserService.signOut();
  }

  public onViewProfile(): void {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`users/${this.user.username}`]);
  });
  
    this.isMenuVisible = false;
  }

  public onEdit(): void {
    this.router.navigate(['editProfile'])
    this.isMenuVisible = false;
  }

  public onAddDish(): void {
    this.router.navigate(['addNewDish'])
    this.isMenuVisible = false;
  }
}
