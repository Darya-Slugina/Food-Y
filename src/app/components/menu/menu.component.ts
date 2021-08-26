import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title: string = 'Choose a category and find a dish that suits your taste!';
  categories: string[] = [
    'Appetizers',
    'Salads',
    'Soup',
    'Pizza',
    'Pasta',
    'Desserts',
    'Breackfast',
    'Main',
    'Drinks',
    'Specials',
    'Burger',
    'From the Grill',
    'Sushi',
    'Kids',
  ];
  category: string = '';

  constructor(private router: Router, private service: FoodService ) {}

  ngOnInit() {
    this.service._isFilterActive$.next(false);
  }

  onClick(event) {
    this.category = event.target.innerText.toLowerCase();
    this.service._isFilterActive$.next(true);
    this.router.navigate([`/menu/${this.category}`]);
  }
}
