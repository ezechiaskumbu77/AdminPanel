import { EntrepriseInfo } from './../granted/delivery/model/delivery-corp.model';
import { CollaborationStatusEnum } from './../model/collaboration-status.enum';
import { RoleEnum } from './../user/login/model/user.model';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { customEnvironment } from 'src/environments/custom-environment';
import { map, switchMap } from 'rxjs/operators';


interface OfficeView {
  name: string,
  _id: string,
  status: CollaborationStatusEnum
}

@Pipe({
  name: 'remoteOfficeByUserId'
})
export class RemoteOfficeByUserIdPipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  toOfficeViwOrNull = (resp: any) => {
    return (<any[]>resp.data).length > 0 ?
      {
        name: resp.data[0].EntrepriseInfo != undefined ? resp.data[0].EntrepriseInfo.name : resp.data[0].name,
        _id: resp.data[0]._id,
        status: resp.data[0].status
      } :
      null
  }

  transform(value: any): Observable<OfficeView> {
    let officeView$: Observable<OfficeView> | null;
    switch (value.role) {
      case RoleEnum.SHOPOWNER:
        officeView$ = this.http.get(customEnvironment.BASE_URL + '/shop/?shopOnwer=' + value._id).pipe(
          map(
            this.toOfficeViwOrNull
          )
        )
        break;
      case RoleEnum.SHOPMANAGER:
        officeView$ = this.http.get(customEnvironment.BASE_URL + '/shop/?shopManager=' + value._id).pipe(
          map(
            this.toOfficeViwOrNull
          )
        )
        break;
      case RoleEnum.DELIVERMANAGER:
        officeView$ = this.http.get(customEnvironment.BASE_URL + '/delivercorp/?ownerUser=' + value._id).pipe(
          map(
            this.toOfficeViwOrNull
          )
        )
        break;
      case RoleEnum.DELIVERBOY:
        officeView$ = this.http.get(customEnvironment.BASE_URL + '/deliverboy/?userID=' + value._id).pipe(
          map(
            (resp: any) => {
              console.log('db d', resp)
              return (<any[]>resp.data).length > 0 ?
                {
                  name: resp.data[0].boyOwner.entrepriseInfo.name,
                  _id: resp.data[0].boyOwner._id,
                  status: resp.data[0].boyOwner.status
                }
                :
                null
            }
          )
        )
        break;
      default:
        officeView$ = of({
          name: 'PPC',
          _id: 'null',
          status: CollaborationStatusEnum.AGREED
        })
    }
    return officeView$;
  }

}
