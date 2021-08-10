import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  signinForm: FormGroup;
  showPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;   
  }

  onSubmit() {
    let form = this.signinForm.value;
    this.authService.signIn(form);
  }

  onFacebookLogin() {
    this.authService.FacebookAuth()
  }
}
