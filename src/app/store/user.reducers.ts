import { createReducer, on, Action } from '@ngrx/store';
import { setUser } from './user.actions';


export const initialState: any = {};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { User }) => User),
//   on(filterDishes, (state,  {filterOption} ) => state.filter((dish) => dish.title.toLowerCase() === filterOption.toLowerCase())),
//   on(deleteCountry, (state,  {deletedCountry} ) => state.filter((country) => country.name !== deletedCountry)),
//   on(addCountry, (state,  {newCountry} ) => [...state, newCountry]),
);