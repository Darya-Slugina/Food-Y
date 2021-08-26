import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiChatService } from 'src/app/shared/services/api-chat.service';

export interface Message {
  createdAt: number;
  id: string;
  from: string;
  msg: string;
  toName: string;
  newMsg: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _allChats$ = new BehaviorSubject<any>(null);
  public readonly allChats = this._allChats$.asObservable();

  private _chat$ = new BehaviorSubject<any>(null);
  public readonly chat = this._chat$.asObservable();
  public readonly chatArray = this._chat$
    .asObservable()
    .pipe(map((chat) => this.getChatsAsArray(chat)));

  constructor(private apiChatService: ApiChatService) {
    this.getAllChats();
  }

  getChatData(index) {
    this.apiChatService
      .getMessagesFromChatroom(index)
      .pipe(
        filter((res) => res !== null),
        map((res) => {
          this._chat$.next(res);
        })
      )
      .subscribe();
  }

  getAllChats() {
    this.apiChatService
      .getAllChatrooms()
      .pipe(
        filter((res) => res !== null),
        map((res) => {
          this._allChats$.next(res);
        })
      )
      .subscribe();
  }

  findChatRoom(loggedInUser, username) {
    return this.allChats.pipe(
      filter((chats) => chats !== null),
      map((chat) => {
        let chatName;
        for (let prop in chat) {
          if (
            prop === loggedInUser.concat(username) ||
            prop === username.concat(loggedInUser)
          ) {
            chatName = prop;
          }
        }
        return chatName;
      })
    );
  }

  addMessage(message: Message, id: string) {
    this.apiChatService
      .addMessage(message, id, message.id)
      .subscribe((res: Message) => {
        const obj = {};
        obj[res.id] = res;
        this._chat$.next({
          ...this._chat$.value,
          ...obj,
        });
      });
  }

  private getChatsAsArray(food: any) {
    const resultArr = [];
    for (let prop in food) {
      resultArr.push(food[prop]);
    }
    return resultArr;
  }
}
