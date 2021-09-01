import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from 'src/app/shared/interfaces/food.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(food: Dish[], inputValue?: string): any {
    if (!inputValue) return food;

    let filteredByTitle = food.filter((dish) =>
      dish.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    let filteredByIngredients = food.filter(
      (dish) =>
        dish.ingredients.filter((el) =>
          el.toLowerCase().includes(inputValue.toLowerCase())
        ).length > 0
    );

    
    if (filteredByTitle.length > 0) return filteredByTitle;
    if (filteredByIngredients.length > 0) return filteredByIngredients;    
  }
}
