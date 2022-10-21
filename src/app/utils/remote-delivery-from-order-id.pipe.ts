import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';
import { Delivery } from '../granted/delivery/model/delivery.model';

@Pipe({
  name: 'remoteDeliveryFromOrderId'
})
export class RemoteDeliveryFromOrderIdPipe implements PipeTransform {
  constructor(private _http: HttpClient) { }
  transform(value: any, ...args: any[]): Observable<Delivery | null> {
    let qs = customEnvironment.BASE_URL + '/delivery?OrderId=' + value;
    return value != undefined ? this._http.get(qs).pipe(map((res: any) => {
      return res.data[0]
    })) : of(null)
  }
}
