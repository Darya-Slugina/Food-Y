import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  constructor(private http: HttpClient) {}

  addNewUser(user: any, userId: string) {
    return this.http.put(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
      user
    );
  }

  fetchUser(userId): Observable<User> {
    return this.http.get<User>(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
    );
  }

  // updateUser(user: User, userId: string) {
  //       return this.http.put(
  //         `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
  //         user
  //       );
  // }

  //   fetchFoods(): Observable<any> {
  //     return this.http.get<any>(
  //       'https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food.json'
  //     );
  //   }

  //   addComment(comment: Comment, title: string, id: number) {
  //     return this.http.put(
  //       `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food/${title}/comments/${id}.json`,
  //       comment
  //     );
  //   }

  //   addNewDish(dish: any) {
  //     return this.http.put(
  //       `https://angular-project-e49e1-default-rtdb.firebaseio.com/movies/${movie.title}.json`,
  //       movie
  //     );
  //   }

  //   deleteDish(title: string): Observable<{}> {
  //     return this.http.delete(
  //       `https://angular-project-e49e1-default-rtdb.firebaseio.com/movies/${title}.json`
  //     );
  //   }
}
