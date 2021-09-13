import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Dish } from 'src/app/shared/interfaces/food.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

const maxFileSize = 4000000;

@Component({
  selector: 'app-add-edit-dish',
  templateUrl: './add-edit-dish.component.html',
  styleUrls: ['./add-edit-dish.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditDishComponent implements OnInit {
  public addDishForm: FormGroup;
  public title: string;
  public editMode: boolean = false;
  public downloadURL: string;
  public imageFile: File = null;
  public uploadPercent: Observable<number>;
  public percent: number;
  public errorMessage: string = '';
  public defaultCategory: 'main';
  public ratingDisplay: number;
  public value: number;
  public dishForEdit: Dish;

  public categories: string[] = [
    'Appetizers',
    'Salads',
    'Soup',
    'Pizza',
    'Pasta',
    'Desserts',
    'Breackfast',
    'Main',
    'Drinks',
    'Specials',
    'Burger',
    'From the Grill',
    'Sushi',
    'Kids',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private service: FoodService,
    private reastaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.title = params['dish'];
      this.editMode = params['dish'] != null;

      this.initForm();
    });
    this.service._isFilterActive$.next(false);

    this.categories.sort((a, b) => (a.localeCompare(b)));
  }

  public onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  public onSubmit(): void {
    console.log(this.addDishForm.value);

    if (this.editMode) {
      this.service.editDish(this.addDishForm.value, this.dishForEdit.id);
      this.router.navigate([`../../${this.title}`], {
        relativeTo: this.route,
      });
    } else {
      this.service.addNewDish(this.addDishForm.value);
      this.router.navigate([`/home`], {
        relativeTo: this.route,
      });
    }
  }

  public onCancel(): void {
    if (this.editMode) {
      this.router.navigate(['..'], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  public onFileSelected($event): void {
    this.errorMessage = '';
    if ($event.target.files.length > 0 && $event.target.files[0] != null) {
      const file = $event.target.files[0];
      if (this.validateFile(file)) {
        this.imageFile = file;
        console.log(this.imageFile);
      } else {
        this.errorMessage = 'Not a valid file!';
      }
    }
  }

  public uploadImage(): void {
    const filePath =
      '/images/' + Math.floor(Math.random() * 100) + this.imageFile.name;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.imageFile);
    uploadTask.percentageChanges().subscribe((data) => (this.value = data));
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((data) => {
            this.downloadURL = data;
            this.addDishForm.get('img').setValue(data);
          })
        )
      )
      .subscribe((res) => console.log(res, 'res'));
  }

  public getAddress(name: string): void {
    this.reastaurantsService.getDataForRestaurants().subscribe((res) => {
      let restaurant = res.find(
        (item) => item.restaurant.toLowerCase() === name.toLowerCase()
      );
      if (restaurant) {
        console.log(restaurant.address);
        this.addDishForm.controls['address'].setValue(restaurant.address);
        this.addDishForm.controls['lat'].setValue(restaurant.lat);
        this.addDishForm.controls['lng'].setValue(restaurant.lng);
      }
    });
  }

  private initForm(): void {
    const dishObj = {
      dishTitle: '',
      dishRestaurant: '',
      dishAddress: '',
      dishLat: null,
      dishLng: null,
      dishImg: '',
      dishPrice: null,
      dishRating: null,
      dishCategory: '',
      dishIngredients: null,
      dishDescription: '',
    };

    if (this.editMode) {
      this.service.getDish(this.title).subscribe((res) => {
        const dish = res;
        this.dishForEdit = res;

        dishObj.dishTitle = dish.title;
        dishObj.dishRestaurant = dish.restaurant;
        dishObj.dishAddress = dish.location;
        dishObj.dishLat = dish.lat;
        dishObj.dishLng = dish.lng;
        dishObj.dishImg = dish.img;
        dishObj.dishPrice = dish.price;
        dishObj.dishRating = dish.rating;
        dishObj.dishCategory = dish.category;
        dishObj.dishIngredients = dish.ingredients;
        dishObj.dishDescription = dish.description;

        console.log(dishObj);

        this.setFormData(dishObj);
      });
    }

    this.setFormData(dishObj);
  }

  private setFormData(obj): void {
    this.addDishForm = new FormGroup({
      title: new FormControl(obj.dishTitle, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z ]*$'),
        this.forbiddenInputs.bind(this),
      ]),
      restaurant: new FormControl(obj.dishRestaurant, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
        Validators.pattern("^[a-zA-Z0-9 -']+"),
        this.forbiddenInputs.bind(this),
      ]),
      address: new FormControl(obj.dishAddress, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10),
        Validators.pattern("^[a-zA-Z0-9 -',.]+"),
        this.forbiddenAddressInput.bind(this),
      ]),
      lat: new FormControl(obj.dishLat, [
        Validators.required,
        Validators.pattern('[0-9][0-9.]*[0-9]'),
      ]),
      lng: new FormControl(obj.dishLng, [
        Validators.required,
        Validators.pattern('[0-9][0-9.]*[0-9]'),
      ]),
      img: new FormControl(obj.dishImg, [Validators.required]),
      price: new FormControl(obj.dishPrice, [
        Validators.required,
        Validators.pattern('^[0-9][0-9]*[.]?[0-9]{0,2}$'),
      ]),
      rating: new FormControl(obj.dishRating, [
        Validators.required,
        Validators.pattern('^[0-5]$'),
      ]),
      category: new FormControl(obj.dishCategory, [Validators.required]),
      ingredients: new FormControl(obj.dishIngredients, [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(5),
      ]),
      description: new FormControl(obj.dishDescription, [
        Validators.required,
        Validators.maxLength(150),
        Validators.minLength(5),
        this.forbiddenTextarea.bind(this),
      ]),
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

  private forbiddenInputs(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length <= 3) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  private forbiddenAddressInput(control: FormControl): { [s: string]: boolean } {
    let match = control.value.split(',');
    let newArr = [];

    for (let a in match) {
      let variable = match[a];
      if (variable !== '') {
        newArr.push(variable);
      }
    }

    if (control.value.trim().length <= 9) {
      return { addressIsForbidden: true };
    } else if (newArr.length <= 2) {
      return { addressIsForbidden: true };
    }
    return null;
  }

  private forbiddenTextarea(control: FormControl): { [s: string]: boolean } {
    const replaced = control.value.replace(/[,.\s]/g,"");
    if (replaced.length <= 5) {     
      return { inputIsForbidden: true };
    }
    return null;
  }
  private forbiddenIngredients(control: FormControl): { [s: string]: boolean } {
    const replaced = control.value.replace(/[,.\s]/g,"");
    if (replaced.length <= 5) {     
      return { inputIsForbidden: true };
    }
    return null;
  }
}
