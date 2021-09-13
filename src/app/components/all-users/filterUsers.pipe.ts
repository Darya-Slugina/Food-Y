import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: User[], input?: string): any {
    if (!input) return users;

    return users.filter((user) =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );  
  }
}
