import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(): Observable<User> {
    return this.http.get<User>(
      'https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food.json'
    );
  }
}