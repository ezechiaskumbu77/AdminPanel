import { ShopSale } from './../granted/shops/shop-sales/shop-sales-ppc/model/shop-sale.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalSales'
})
export class TotalSalesPipe implements PipeTransform {

  transform(value: ShopSale[], ...args: any[]): any {
    console.log()
    return value.filter(i => i.deviseType == args[0]).reduce(
      (sum, currValue) => sum + currValue.number * currValue.price - (currValue.discount ? currValue.discount : 0),
      0
    )
  }

}
