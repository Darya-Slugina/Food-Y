import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/components/chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ApiChatService {

  constructor(private http: HttpClient) {}

  createRoom(username: string) {
    return this.http.put(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${username}.json`,
     {}
    );
  }

  getAllChatrooms() {
    return this.http.get(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json`
    );
  }

  addMessage(message: Message, chatId: string, id:string) {
    return this.http.put(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/${id}}.json`,
      message
    );
  }

  getMessagesFromChatroom(username: string) {
    return this.http.get(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${username}.json`
    );
  }
}
