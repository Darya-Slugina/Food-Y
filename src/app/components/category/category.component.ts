import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: string;
  food: Dish[];
  selectedItem: number = -1;

  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private router: Router
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('name');
    this.service
      .getFoodsByCategory(this.category)
      .subscribe((res) => (this.food = res));
  }

  onMouseOn(index: number) {
    this.selectedItem = index;
  }

  onMouseOut(index: number) {
    this.selectedItem = -1;
  }

  onClick(title: string) {
    this.router.navigate([`/menu/${this.category}/${title}`]);
    this.service._isFilterActive$.next(false);
  }
}
