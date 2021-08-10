import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRestaurants',
})
export class FilterRestaurantsPipe implements PipeTransform {
  transform(restaurants: string[], input?: string): any {
    if (!input) return restaurants;

    return restaurants.filter((rest) =>
      rest.toLowerCase().includes(input.toLowerCase())
    );  
  }
}
