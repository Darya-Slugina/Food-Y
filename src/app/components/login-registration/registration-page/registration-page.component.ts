import { Component, ContentChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  signupForm: FormGroup;
  showPassword = false;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if(user){
      this.router.navigate([``]);
    }


    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;   
  }

  onSubmit(){
    this.authService.signUp(this.signupForm.value);
    this.signupForm.reset();
  }
}
