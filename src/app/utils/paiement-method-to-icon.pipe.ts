import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paiementMethodToIcon'
})
export class PaiementMethodToIconPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let icon = "credit_card"
    switch (value) {
      case 'cash on deliver':
        icon = 'money'
        break;
      case 'mobile money':
        icon = 'mobile_screen_share'
        break;
    }
    return icon;
  }

}
