import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private authUserService: AuthService,
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.authUserService.setUserInfo(JSON.parse(user));
    } else {
      this.router.navigate(['/login']);
    }
  }
}
