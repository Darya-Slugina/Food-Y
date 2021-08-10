import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [FilterPipe],
  encapsulation: ViewEncapsulation.None,
})
export class CardsComponent implements OnInit {
  @Input() dishes: Dish[];
  inputValue: string;

  constructor(private service: FoodService, private router: Router) {}

  ngOnInit() {
    this.service.input.subscribe((res) => (this.inputValue = res));
  }

  onClick(category, title) {
    this.router.navigate([`/menu/${category}/${title}`]);
    this.service._isFilterActive$.next(false);
  }
}
