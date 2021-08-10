import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Comment } from 'src/app/shared/models/comment.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentBoxComponent implements OnInit {
  @Input() comment: Comment;
  @Input() user: User;
  isButtonVisible: boolean;

  constructor() {}

  ngOnInit() {
    if (this.user && this.user.username === this.comment.postedBy) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
  }

  onEditClick(id: string) {
    console.log(id);
  }

  onDeleteClick(id: string) {
    console.log(id);
  }
}
