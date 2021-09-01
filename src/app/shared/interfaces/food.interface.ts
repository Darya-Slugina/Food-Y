import { Comment } from 'src/app/shared/interfaces/comment.interface';

export interface Dish {
  id: number;
  title: string;
  img: string;
  ingredients: string[];
  price: number;
  currency: string;
  restaurant: string;
  location: string;
  rating: number;
  category: string;
  description: string;
  postedBy: string;
  postedByImg: string;
  comments:Comment[];
}
