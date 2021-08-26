import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss'],
})
export class RestaurantPageComponent implements OnInit {
  dishes: Dish[];
  columnDefs = [
    {
      headerName: 'Restaurant',
      field: 'restaurant',
      sortable: true,
      filter: true,
      resizable: true,
      width: 200,
      minWidth: 120,
      maxWidth: 250,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Address',
      field: 'address',
      sortable: true,
      filter: true,
      resizable: true,
      width: 350,
      minWidth: 150,
      maxWidth: 450,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Avg Rating',
      field: 'rating',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      minWidth: 60,
      maxWidth: 150,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Dishes',
      field: 'dishes',
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
      minWidth: 60,
      maxWidth: 150,
      suppressSizeToFit: false,
    },
  ];

  rowData: any[];

  constructor(
    private service: FoodService,
    private router: Router,
    private restarauntService: RestaurantsService
  ) {}

  ngOnInit() {
    this.service._isFilterActive$.next(false);
    this.restarauntService
      .getDataForRestaurants()
      .subscribe((res) => (this.rowData = res));
  }

  rowClickedEvent(e) {
    let restaurant = e.data.restaurant;
    this.router.navigate([`/restaurant/${restaurant}/info`]);
  }
}
