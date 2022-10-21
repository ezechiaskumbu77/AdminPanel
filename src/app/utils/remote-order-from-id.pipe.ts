import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remoteOrderFromId'
})
export class RemoteOrderFromIdPipe implements PipeTransform {
  constructor(private _http: HttpClient) { }
  transform(value: any, ...args: any[]): any {
    let qs = customEnvironment.BASE_URL + '/orderppc?_id=' + value;
    return value != undefined ? this._http.get(qs).pipe(map((res: any) => {
      return res.data[0]
    })) : of(null)
  }
}
