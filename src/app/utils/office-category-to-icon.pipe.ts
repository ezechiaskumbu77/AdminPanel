import { RoleEnum } from './../user/login/model/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'officeCategoryToIcon'
})
export class OfficeCategoryToIconPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let icon: string;
    switch (value) {
      case RoleEnum.SHOPMANAGER:
      case RoleEnum.SHOPOWNER:
        icon = 'storefront'
        break;
      case RoleEnum.DELIVERMANAGER:
      case RoleEnum.DELIVERBOY:
        icon = 'directions_boat'
        break;
      default:
        icon = 'business'
        break;
    }
    return icon;
  }

}
