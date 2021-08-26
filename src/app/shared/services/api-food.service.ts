import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment.model';
import { Dish } from '../models/food.model';
import { filter, share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchFoods(): Observable<any> {
    return this.http.get<any>(
      'https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food.json'
    );
  }

  addComment(comment: Comment, title: string, id: number) {
    return this.http.put(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food/${title}/comments/${id}.json`,
      comment
    );
  }

  deleteComment(title: string, id: number): Observable<{}> {
    return this.http.delete(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food/${title}/comments/${id}.json`
    );
  }

  addDish(dish: Dish) {
    return this.http.put(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food/${dish.title}.json`,
      dish
    );
  }

  deleteDish(title: string): Observable<{}> {
    return this.http.delete(
      `https://foody-21ab7-default-rtdb.europe-west1.firebasedatabase.app/food/${title}.json`
    );
  }
}
