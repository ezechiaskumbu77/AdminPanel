import { customEnvironment } from '../../../../environments/custom-environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeliveryCorpActions, DeliveryCorpActionsType, DeliveryCorpsLoaded } from './deliverys.actions';

@Injectable()
export class DeliveryCorpEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadDeliveryCorp = this.actions.pipe(
    ofType(DeliveryCorpActionsType.LOAD_DELIVERY_CORPS),
    switchMap(
      (action: DeliveryCorpActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/delivercorp/?status=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new DeliveryCorpsLoaded(response.data));
            }
            )
          )
    )
  )
}
