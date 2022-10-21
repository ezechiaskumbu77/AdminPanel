import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'remoteShopManagerById'
})
export class RemoteShopManagerByIdPipe implements PipeTransform {

  constructor(private http: HttpClient) { }
  transform(value: any): Observable<any> {
    return value != undefined ? this.http.get(customEnvironment.BASE_URL + '/shopmanager/?_id=' + value).pipe(map((res: any) => {

      return res.data.length > 0 ? res.data[0] : of(null)
    })) : of(null)
  }

}
