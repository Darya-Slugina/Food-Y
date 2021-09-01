import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentBoxComponent implements OnInit {
  public isButtonVisible: boolean;
  user: User;
  @Input() comment: Comment;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor(private authUserService: AuthService) {}

  ngOnInit() {
    this.authUserService.userInfo.subscribe((res) => {
        this.user = res;
        if (this.user && this.user.username === this.comment.postedBy) {
          this.isButtonVisible = true;
        } else {
          this.isButtonVisible = false;
        }
      });
  }

  onEditClick(id: string): void {
    this.onEdit.emit(id);
  }

  onDeleteClick(id: string): void {
    this.onDelete.emit(id);
  }
}
