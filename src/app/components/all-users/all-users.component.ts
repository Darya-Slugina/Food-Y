import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from '../chat/chat.service';
import { FilterUsersPipe } from './filterUsers.pipe';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  providers: [FilterUsersPipe],
})
export class AllUsersComponent implements OnInit {
  public users: User[];
  public selectedItem: number = -1;
  public chatIsActive: boolean = false;
  public activeTab: number = -1;
  public chatWith: string;
  public index: string;
  public loggedInUser: User;
  public input: string = '';

  constructor(
    private userService: UserService,
    private service: FoodService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.service.inputUsers.subscribe((res) => (this.input = res));
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

  public onMouseOver(index: number): void {
    this.selectedItem = index;
  }

  public onMouseOut(): void {
    this.selectedItem = -1;
  }

  public onImgClick(username): void {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([
          `/users/${username}`,
          { outlets: { sidebar: [null] } },
        ]);
      });
  }

  public onClick(username, index): void {
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
