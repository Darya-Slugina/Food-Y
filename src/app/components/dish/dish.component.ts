import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DataStorageService } from 'src/app/shared/services/api-food.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DishComponent implements OnInit {
  public dishes: Dish[];
  public dishTitle: string;
  public currentDish: Dish;
  public isInFavourite: boolean;
  public ratingDisplay: number;
  public commentForm: FormGroup;
  public commentsArray: Comment[];
  public isHeartShow: boolean = false;
  @Output() isFormVisible: boolean = true;
  @Output() comment: Comment;
  @Output() user: User;
  // public dishes$: Observable<Dish[]> = of([]);
  // public user$: Observable<User> = of();

  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private authUserService: AuthService,
    private store: Store<{ dishes: Dish[] }>, // private userStore: Store<{ user: User }>
    private apiFoodService: DataStorageService
  ) {}

  ngOnInit() {
    this.dishTitle = this.route.snapshot.paramMap.get('dish');

    this.route.data.subscribe((data: { dishes: Dish[] }) => {
      this.dishes = data.dishes;
    });

    this.service.getCurrentDish(this.dishTitle).subscribe((res) => {
      this.currentDish = res;
    });

    // this.dishes$ = this.store.select('dishes');
    this.service._isFilterActive$.next(false);

    // this.user$.subscribe((user) => {
    //   this.user = user;
    //   if (this.user.favourites) {
    //     this.favouruteCheck();
    //   }
    // });

    this.authUserService.userInfo
      .pipe(filter((user) => user !== null))
      .subscribe((res) => {
        this.user = res;
        this.favouriteCheck();
        this.selfCommentCheck();
      });

    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });
  }

  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  onCommentSubmit(title: string, comments: any) {
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
    if (comments) {
      commentId = comments.length;
    } else {
      commentId = 0;
    }

    this.service.addCommentToDish(comment, title, commentId);
  }

  addToFavourite() {
    this.isInFavourite = !this.isInFavourite;
    let userId = JSON.parse(localStorage.getItem('user'));

    if (
      this.user.favourites &&
      this.user.favourites.filter((dish) => dish === this.currentDish.id)
        .length > 0
    ) {
      this.authUserService.deleteFromFavouriteDish(this.currentDish.id, userId);
    } else {
      this.authUserService.addToFavouriteDish(this.currentDish.id, userId);
      this.isHeartShow = true;
      setTimeout(() => {
        this.isHeartShow = false;
      }, 1000);
    }
  }

  private favouriteCheck() {
    if (
      this.currentDish &&
      this.user &&
      this.user.favourites &&
      this.user.favourites.length > 0
    ) {
      if (this.user.favourites.includes(this.currentDish.id)) {
        this.isInFavourite = true;
      } else {
        this.isInFavourite = false;
      }
    } else {
      this.isInFavourite = false;
    }
  }

  private selfCommentCheck() {
    if (this.currentDish && this.user && this.currentDish.comments) {
      let selfComment = this.currentDish.comments.find(
        (item) => item.postedBy === this.user.username
      );
      if (selfComment) {
        this.isFormVisible = false;
      }
    }
  }
}
