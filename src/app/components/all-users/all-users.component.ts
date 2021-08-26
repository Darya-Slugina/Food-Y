import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  users: any;
  selectedItem: number = -1;
  chatIsActive: boolean = false;
  activeTab: number = -1;
  chatWith: string;
  index: string;
  public loggedInUser: User;

  constructor(
    private userService: UserService,
    private service: FoodService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      this.loggedInUser = res;
      this.userService.allUsersArray.subscribe((res) => {
        this.users = res.filter(
          (user) => user.username !== this.loggedInUser.username
        );
      });
      this.service._isFilterActive$.next(false);
    });
  }

  onMouseOver(index: number) {
    this.selectedItem = index;
  }

  onMouseOut() {
    this.selectedItem = -1;
  }

  onImgClick(username) {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([
          `/users/${username}`,
          { outlets: { sidebar: [null] } },
        ]);
      });
  }

  onClick(username, index) {
    this.chatIsActive = true;
    this.activeTab = index;
    this.chatWith = username;
    this.chatService
      .findChatRoom(this.loggedInUser.username, this.chatWith)
      .subscribe((res) => {
      if(res){
        this.index = res;
      } else {
        this.index = this.loggedInUser.username.concat(username);
      }
      });

    this.router.navigate([
      '/users',
      { outlets: { sidebar: [`chat`, username, this.index] } },
    ]);
  }
}
