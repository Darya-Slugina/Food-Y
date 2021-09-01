import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/chat-message.interface';



@Injectable({
  providedIn: 'root'
})
export class ApiChatService {

  constructor(private http: HttpClient) {}

  // public createRoom(username: string) {
  //   return this.http.put(
  //     `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${username}.json`,
  //    {}
  //   );
  // }

  public getAllChatrooms(): Observable<{ [key: string]: Message }> {
    return this.http.get<{ [key: string]: Message }>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json`
    );
  }

  public addMessage(message: Message, chatId: string, id:string): Observable<Message> {
    return this.http.put<Message>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/${id}}.json`,
      message
    );
  }

  public getMessagesFromChatroom(username: string):Observable<Message> {
    return this.http.get<Message>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${username}.json`
    );
  }
}
