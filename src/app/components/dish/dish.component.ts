import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DataStorageService } from 'src/app/shared/services/api-food.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DishComponent implements OnInit {
  public dishTitle: string;
  public currentDish: Dish;
  public isInFavourite: boolean;
  public ratingDisplay: number;
  public commentForm: FormGroup;
  public commentsArray: Comment[];
  public isHeartShow: boolean = false;
  public editMode: boolean = false;
  public isEditDishAllow: boolean = false;

  @Output() isFormVisible: boolean = true;
  @Output() comment: Comment;
  @Output() user: User;
  // public dishes$: Observable<Dish[]> = of([]);
  // public user$: Observable<User> = of();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FoodService,
    private authUserService: AuthService,
    private userService: UserService
  ) // private store: Store<{ dishes: Dish[] }>, // store
  // private userStore: Store<{ user: User }> //store
  {}

  ngOnInit() {
    this.dishTitle = this.route.snapshot.paramMap.get('dish');

    //  ---------------- food resolver ---------------
    // this.route.data.subscribe((data: { dishes: Dish[] }) => {
    //   this.dishes = data.dishes;
    //   console.log(this.dishes, "dishes fro dish");
    // });

    // this.dishes$ = this.store.select('dishes'); // store

    this.service.getCurrentDish(this.dishTitle).subscribe((res) => {
      this.currentDish = res;

      if (this.currentDish) {
        this.userService
          .isDishInFavourite(res.id)
          .subscribe((res) => (this.isInFavourite = res));
          
        this.userService
          .isSelfComment(this.currentDish)
          .subscribe((selfComment) => {
            if (selfComment) {
              this.isFormVisible = false;
            }
          });

        this.userService
          .isSelfDish(this.currentDish)
          .subscribe((res) => (this.isEditDishAllow = res));
      }
    });

    this.authUserService.userInfo.subscribe((res) => {
      this.user = res;
    });

    this.service._isFilterActive$.next(false);

    this.initForm();
  }

  public onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  public onCommentSubmit(title: string, comments: any) {
    let comment = {
      id: Date.now() + this.user.username,
      postedBy: this.user.username,
      userImg: this.user.userImg,
      postedOn: Date.now(),
      rating: this.ratingDisplay,
      comment: this.commentForm.value.comment,
    };
    this.isFormVisible = false;

    let commentId;

    if (comments && this.editMode) {
      commentId = this.currentDish.comments.findIndex(
        (item) => item.postedBy === this.user.username
      );
    } else if (comments && !this.editMode) {
      commentId = comments.length;
    } else {
      commentId = 0;
    }

    this.service.addCommentToDish(comment, title, commentId);
    this.editMode = false;
  }

  public editComment() {
    this.isFormVisible = true;
    this.editMode = true;
    this.initForm();
  }

  public deleteComment(index) {
    this.service.deleteComment(this.dishTitle, index);
    this.commentForm.controls.comment.setValue('');
    this.isFormVisible = true;
  }

  public addToFavourite() {
    this.isInFavourite = !this.isInFavourite;
    let userId = JSON.parse(localStorage.getItem('user'));

    if (
      this.user.favourites &&
      this.user.favourites.filter((dish) => dish === this.currentDish.id)
        .length > 0
    ) {
      this.userService.deleteFromFavouriteDish(this.currentDish.id, userId);
    } else {
      this.userService.addToFavouriteDish(this.currentDish.id, userId);
      this.isHeartShow = true;
      setTimeout(() => {
        this.isHeartShow = false;
      }, 1000);
    }
  }

  public onDeleteDish() {
    let userId = JSON.parse(localStorage.getItem('user')); 
    
    this.service.deleteDish(this.dishTitle);
    this.userService.deleteFromFavouriteDish(this.currentDish.id, userId);
    this.router.navigate([''])
  }

  private initForm() {
    let commentText = '';

    if (this.editMode) {
      let selfComment = this.currentDish.comments.find(
        (item) => item.postedBy === this.user.username
      );
      commentText = selfComment.comment;
    }

    this.commentForm = new FormGroup({
      comment: new FormControl(commentText, Validators.required),
    });
  }
}
