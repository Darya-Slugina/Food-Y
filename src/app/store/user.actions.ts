import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[User List/API] Set User Success',
  props<{ User }>()
);

// export const setFavourites = createAction(
//   '[Favourites List/API] Set Favourites Success',
//   props<{ User }>()
// );