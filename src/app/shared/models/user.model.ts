import { Dish } from "./food.model";

export interface User {
    username: string;
    email: string;
    userImg: string;
    favourites?: any;
  }