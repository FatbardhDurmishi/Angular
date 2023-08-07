import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Pipe({
  name: 'sortPipe',
})
export class SortPipePipe implements PipeTransform {
  transform(value: User[], sorting?: string): User[] {
    if (sorting === 'asc') {
      value.sort((a, b) => a.userName.localeCompare(b.userName));
    } else if (sorting === 'desc') {
      value.sort((a, b) => b.userName.localeCompare(a.userName));
    }
    return value;
  }
}
