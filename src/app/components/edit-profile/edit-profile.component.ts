import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

const maxFileSize = 4000000;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditProfileComponent implements OnInit {
  public editForm: FormGroup;
  public user: User;
  public isDisabled: boolean = true;
  public downloadURL: string;
  public imageFile: File = null;
  public errorMessage: string = '';
  public value: number;
  public emailChangeBox: boolean = false;
  public signinForm: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authUserService: AuthService,
    private storage: AngularFireStorage,
    private service: FoodService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();

    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    this.service._isFilterActive$.next(false);
  }

  public onSubmit():void {
    let favouritesArr;
    if (this.user.favourites) {
      favouritesArr = this.user.favourites;
    } else {
      favouritesArr = [];
    }

    this.userService.changeUserInfo(
      this.editForm.value,
      favouritesArr,
      this.signinForm.value.email,
      this.signinForm.value.password
    );
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  public onEditEmailSubmit():void {
    this.emailChangeBox = false;
    console.log(this.signinForm.value.email, this.signinForm.value.password);
  }

  public onEmailCancel(): void {
    this.emailChangeBox = false;
    this.editForm.get('email').setValue(this.user.email);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onEmailChange(): void {
    this.emailChangeBox = true;
  }

  public onFileSelected($event): void {
    this.errorMessage = '';
    if ($event.target.files.length > 0 && $event.target.files[0] != null) {
      const file = $event.target.files[0];
      if (this.validateFile(file)) {
        this.imageFile = file;
      } else {
        this.errorMessage = 'Not a valid file!';
      }
    }
  }

  public uploadImage(): void {
    const filePath =
      '/avatars/' + Math.floor(Math.random() * 100) + this.imageFile.name;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.imageFile);
    uploadTask.percentageChanges().subscribe((data) => (this.value = data));
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((data) => {
            this.downloadURL = data;
            this.editForm.get('img').setValue(data);
          })
        )
      )
      .subscribe((res) => console.log(res, 'res'));
  }

  public toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  private initForm(): void {
    const userObj = {
      username: '',
      email: '',
      country: '',
      img: '',
      liked: '',
      about: '',
    };

    this.authUserService.userInfo
      .pipe(filter((user) => user !== null))
      .subscribe((res) => {
        this.user = res;
        let myCountry;
        let likedDishes;
        let aboutMe;

        if (this.user.country) {
          myCountry = this.user.country;
        } else {
          myCountry = '';
        }

        if (this.user.liked) {
          likedDishes = this.user.liked;
        } else {
          likedDishes = '';
        }

        if (this.user.about) {
          aboutMe = this.user.about;
        } else {
          aboutMe = '';
        }

        userObj.username = this.user.username;
        userObj.email = this.user.email;
        userObj.country = myCountry;
        userObj.img = this.user.userImg;
        userObj.liked = likedDishes;
        userObj.about = aboutMe;

        this.setFormData(userObj);
      });

    this.setFormData(userObj);
  }

  private setFormData(obj): void {
    this.editForm = new FormGroup({
      username: new FormControl(obj.username, [Validators.required]),
      email: new FormControl(obj.email, [
        Validators.required,
        Validators.email,
      ]),
      country: new FormControl(obj.country, [Validators.required]),
      img: new FormControl(obj.img, [Validators.required]),
      liked: new FormControl(obj.liked, [Validators.required]),
      about: new FormControl(obj.about, [Validators.required]),
    });
  }

  private validateFile(file: File): boolean {
    if (file.size > maxFileSize) {
      return false;
    } else if (!file.type.includes('image')) {
      return false;
    }
    return true;
  }
}
