import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRoleToIcon'
})
export class UserRoleToIconPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
