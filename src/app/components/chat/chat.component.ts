import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from 'src/app/shared/interfaces/chat-message.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService} from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('f', { static: false }) chatForm: NgForm;
  public chatWith: string;
  public index: string;
  public loggedInUser: User;
  public message: Message;
  public chatData: any;
  public isSelfMessage: boolean = false;
  private destroy$ = new Subject();

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.chatWith !== params['username']) {
        this.chatWith = params['username'];
        this.index = params['index'];
        this.initData();
      }
    });
  }

  public onSubmit(): void {
    this.message = {
      createdAt: Date.now(),
      id: Date.now() + this.loggedInUser.username,
      from: this.loggedInUser.username,
      msg: this.chatForm.value.input,
      toName: this.chatWith,
      newMsg: true,
    };

    this.chatService.addMessage(this.message, this.index);
    this.chatForm.reset();
  }

  private initData(): void {
    this.chatService.getChatData(this.index);
    this.userService.getUser().subscribe((res) => (this.loggedInUser = res));
    this.chatService.chatArray.pipe(takeUntil(this.destroy$)).subscribe((res) => { 
      console.log(res);
          
      this.chatData = res;
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
