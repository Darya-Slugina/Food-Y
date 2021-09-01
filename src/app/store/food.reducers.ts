import { createReducer, on, Action } from '@ngrx/store';
import { Dish } from '../shared/interfaces/food.interface';
import { addComment, filterDishes, setDishes } from './food.actions';


export const initialState: ReadonlyArray<Dish> = [];
// export const initialState: any = {};

export const foodsReducer = createReducer(
  initialState,
  on(setDishes, (state, { Foods }) => [...Foods]),
  on(filterDishes, (state,  {filterOption} ) => state.filter((dish) => dish.title.toLowerCase() === filterOption.toLowerCase())),
  // on(addComment, (state,  {NewComment, DishTitle} ) => {
  //   let currentDish = state.find((dish) => dish.title === DishTitle)
  //   if (currentDish.comments) {
  //     currentDish.comments.push(NewComment);
  //   } else {
  //     currentDish.comments = [];
  //     currentDish.comments.push(NewComment);
  //   }
  //   return [...state, currentDish]
  // }),
//   on(deleteCountry, (state,  {deletedCountry} ) => state.filter((country) => country.name !== deletedCountry)),
//   on(addCountry, (state,  {newCountry} ) => [...state, newCountry]),
);