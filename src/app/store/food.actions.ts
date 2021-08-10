import { createAction, props } from '@ngrx/store';

export const setDishes = createAction(
  '[Food List/API] Set Foods Success',
  props<{ Foods }>()
);

export const filterDishes = createAction(
  '[Food] Filter Foods',
  props<{ filterOption }>()
);

export const addComment = createAction(
  '[Food] Add Comment to Dish',
  props<{ NewComment, DishTitle }>()
);


// export const deleteCountry = createAction(
//   '[Country] Remove Country',
//   props<{ deletedCountry }>()
// );

// export const addCountry = createAction(
//   '[Country] Add Country',
//   props<{ newCountry }>()
// );
