import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FoodService } from 'src/app/shared/services/food.service';
import { FilterRestaurantsPipe } from './filterRestaurants.pipe';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  providers: [FilterRestaurantsPipe],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavComponent implements OnInit {
  restaurants: string[];
  input: string = '';

  constructor(private service: FoodService) {}

  ngOnInit() {
    this.service.getResaturants().subscribe((res) => this.restaurants = res);
    this.service.inputRes.subscribe((res) => (this.input = res));
  }
}
