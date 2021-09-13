import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../shared/interfaces/food.interface';
import { Comment } from '../../shared/interfaces/comment.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  // encapsulation: ViewEncapsulation.None,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FoodService,
    private authUserService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.dishTitle = this.route.snapshot.paramMap.get('dish');
    this.service._isFilterActive$.next(false);

    this.initAdditionalInfo(this.dishTitle);
    this.initUser();
    this.initForm();
  }

  public onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  public onCommentSubmit(title: string, comments: any): void {
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

  public editComment(): void {
    this.isFormVisible = true;
    this.editMode = true;
    this.initForm();
  }

  public deleteComment(index): void {
    this.service.deleteComment(this.dishTitle, index);
    this.commentForm.controls.comment.setValue('');
    this.isFormVisible = true;
  }

  public addToFavourite(): void {
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

  public onDeleteDish(): void {
    let userId = JSON.parse(localStorage.getItem('user'));

    this.service.deleteDish(this.dishTitle);
    this.userService.deleteFromFavouriteDish(this.currentDish.id, userId);
    this.router.navigate(['']);
  }

  public sortByRating(): void {
    this.currentDish.comments.sort((a: Comment, b: Comment) =>
      a.rating > b.rating ? 1 : -1
    );
  }

  public sortByDate(): void {
    this.currentDish.comments.sort((a: Comment, b: Comment) =>
    a.postedOn > b.postedOn ? 1 : -1
  );
  }

  private initForm(): void {
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

  private initAdditionalInfo(dishTitle): void {
    this.service.getCurrentDish(dishTitle).subscribe((res) => {
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
  }

  private initUser(): void {
    this.authUserService.userInfo.subscribe((res) => {
      this.user = res;
    });
  }
}
