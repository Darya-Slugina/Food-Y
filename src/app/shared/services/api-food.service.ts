import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { Dish } from '../interfaces/food.interface';
import {Comment} from '../interfaces/comment.interface'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  public fetchFoods(): Observable<Dish[]> {
    return this.http.get<Dish[]>(
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

  addDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(
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
