import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'placeById'
})
@Injectable()
export class PlaceByIdPipe implements PipeTransform {

  constructor(private _http: HttpClient) { }
  transform(value: any, ...args: any[]): any {
    return this._http.get(customEnvironment.BASE_URL + '/place/?_id=' + value).pipe(
      map((resp: any) => resp.body.length > 0 ? resp.body[0] : null)
    )
  }

}
