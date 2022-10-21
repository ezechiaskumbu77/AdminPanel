import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'deliverysFromDeliverBoyId'
})
export class DeliversFromDeliverBoyIdPipe implements PipeTransform {


  constructor(private _http: HttpClient) { }
  transform(value: any, ...args: any[]): any {

    return value != undefined ? this._http.get(customEnvironment.BASE_URL + '/delivery/?DeliverdBy=' + value + '&delivery.isDelivered=false').pipe(map((res: any) => {
      return res.data
    })) : of(null)
  }

}
