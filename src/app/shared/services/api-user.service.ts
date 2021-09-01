import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  constructor(private http: HttpClient) {}

  addNewUser(user: any, userId: string): Observable<User> {
    return this.http.put<User>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
      user
    );
  }

  fetchUser(userId): Observable<User> {   
    return this.http.get<User>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
    );
  }

  updateUser(user: User, userId: string): Observable<User> {    
        return this.http.put<User>(
          `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
          user
        );
  }

  fetchUsers(): Observable<User[]> {  
    return this.http.get<User[]>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    );
  }
}
