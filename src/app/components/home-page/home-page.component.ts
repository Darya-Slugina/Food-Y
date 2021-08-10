import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  public dishes$: Observable<Dish[]> = of([]);
  dishes: Dish[];

  constructor(private service: FoodService, private store: Store<{ dishes: Dish[] }>) { }

  ngOnInit() {
    this.dishes$ = this.store.select('dishes');
    this.dishes$.subscribe(dishesArr => this.dishes = dishesArr)
  }
}
