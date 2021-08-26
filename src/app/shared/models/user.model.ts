import { Dish } from "./food.model";

export interface User {
    username: string;
    email: string;
    userImg: string;
    favourites?: any;
    country?: string;
    liked?: string;
    about?: string;
  }