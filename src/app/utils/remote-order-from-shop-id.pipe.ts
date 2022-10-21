import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remoteOrderFromShopId'
})
export class RemoteOrderFromShopIdPipe implements PipeTransform {
  constructor(private http: HttpClient) { }

  transform(value: any): Observable<any> {
    console.log(value);
    return value != undefined ? this.http.get(customEnvironment.BASE_URL + '/orderppc/?shop=' + value + '&status[in]=pending&status[in]=accepted&status[in]=shiped').pipe(map((res: any) => {
      return res.data
    })) : of(null)
  }

}
