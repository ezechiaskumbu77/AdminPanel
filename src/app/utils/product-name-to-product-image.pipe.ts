import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productNameToProductImage'
})
export class ProductNameToProductImagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let uri: string;
    switch (value) {
      case 'Surecast':
        uri = "../../../assets/images/surcast.png"
        break;
      case 'Surecem':
        uri = "../../../assets/images/surcem.png"
        break;
      default:
        uri = "../../../assets/images/assignment.svg"
        break;
    }
    return uri;
  }

}
