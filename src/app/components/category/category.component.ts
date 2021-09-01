import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/shared/interfaces/food.interface';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public category: string;
  public food: Dish[];
  public selectedItem: number = -1;
  public inputValue: string;

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
      this.service.input.subscribe((res) => (this.inputValue = res));
  }

  public onMouseOn(index: number): void {
    this.selectedItem = index;
  }

  public onMouseOut(index: number): void {
    this.selectedItem = -1;
  }

  public onClick(title: string): void {
    this.router.navigate([`/menu/${this.category}/${title}`]);
    this.service._isFilterActive$.next(false);
  }
}
