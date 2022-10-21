import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remoteShopProductByShopId'
})
export class RemoteShopProductByShopIdPipe implements PipeTransform {

  constructor(private http: HttpClient) { }
  transform(value: any): Observable<any> {
    return value != undefined ? this.http.get(customEnvironment.BASE_URL + '/shopproduct/?shop=' + value).pipe(map((res: any) => {

      return res.data
    })) : of(null)
  }

}
