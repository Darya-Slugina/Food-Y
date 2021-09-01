import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public signinForm: FormGroup;
  public showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if(user){
      this.router.navigate([``]);
    }

    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public toggleShow(): void {
    this.showPassword = !this.showPassword;   
  }

  public onSubmit(): void {
    let form = this.signinForm.value;
    this.authService.signIn(form);
  }

  public onFacebookLogin(): void {
    this.authService.FacebookAuth()
  }
}
