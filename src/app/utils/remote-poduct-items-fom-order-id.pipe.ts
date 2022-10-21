import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remotePoductItemsFomOrderId'
})
export class RemotePoductItemsFomOrderIdPipe implements PipeTransform {
  constructor(private http: HttpClient) { }
  transform(value: any): Observable<any> {
    return value != undefined ? this.http.get(customEnvironment.BASE_URL + '/orderitemppc/?orderID=' + value).pipe(map((res: any) => {

      return res.data.sort((i1, i2) => i1.product.name > i2.product.name ? 1 : -1)
    })) : of(null)
  }
}
