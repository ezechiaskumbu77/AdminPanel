import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remoteZonesFromDeliveryBoyId'
})
export class RemoteZonesFromDeliveryBoyIdPipe implements PipeTransform {
  constructor(private _http: HttpClient) { }
  transform(value: any, ...args: any[]): any {
    let qs = customEnvironment.BASE_URL + '/zone?_id[in]=' + value.join('&_id[in]=')
    return value != undefined ? this._http.get(qs).pipe(map((res: any) => {
      return res.data
    })) : of(null)
  }
}
