import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from 'src/app/shared/interfaces/food.interface';
import { RestaurantInfo } from 'src/app/shared/interfaces/restaurant-info.interface';
import { FoodService } from 'src/app/shared/services/food.service';
import { RestaurantsService } from 'src/app/shared/services/restaurants.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss'],
})
export class RestaurantInfoComponent implements OnInit {
  public title: string;
  public dishes: Dish[];
  public restaurantInfo: RestaurantInfo;
  public zoom = 17;
  public center: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 25,
    minZoom: 8,
  };
  lat = 42.648400246470246;
  lng = 23.379120782621452;

  constructor(
    private route: ActivatedRoute,
    private service: FoodService,
    private restaurantService: RestaurantsService
  ) {}

  ngOnInit() {
    this.service._isFilterActive$.next(false);
    this.title = this.route.snapshot.paramMap.get('restaurant');
    this.initRestaurant(this.title);
  }

  private initRestaurant(title): void {
    this.restaurantService.getDataForRestaurants().subscribe((res) => {
      this.restaurantInfo = res.find((item) => item.restaurant === title);
      this.initMap();
    });
  }

  private initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.restaurantInfo.lat,
        lng: this.restaurantInfo.lng,
      };
    });
  }
}
