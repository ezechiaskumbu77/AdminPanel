import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { DeliveryAdded, DeliveryBoyActions, DeliveryBoyActionsType, DeliveryBoysLoaded, DeliveryUpdated, LoadDeliveryBoys } from './delivery-boys.actions';
import { customEnvironment } from 'src/environments/custom-environment';
import { Delivery } from '../../model/delivery.model';

@Injectable()
export class DeliveryBoyEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadDeliveryBoy = this.actions.pipe(
    ofType(DeliveryBoyActionsType.LOAD_DELIVERY_BOYS),
    switchMap(
      (action: DeliveryBoyActions) => {

        let path = customEnvironment.BASE_URL + '/deliverboy/?status=' + (<LoadDeliveryBoys>action).payload.category;
        if ((<LoadDeliveryBoys>action).payload.availability) path = path + '&avaliability=true'
        return this.http.get<any>(path, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new DeliveryBoysLoaded(response.data));
            }
            )
          )
      }


    )
  )

  @Effect()
  addDelivery = this.actions.pipe(
    ofType(DeliveryBoyActionsType.ADD_DELIVERY),
    switchMap(
      (action: DeliveryBoyActions) =>
        this.http.post<any>(customEnvironment.BASE_URL + '/delivery', action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new DeliveryAdded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  updateDelivery = this.actions.pipe(
    ofType(DeliveryBoyActionsType.UPDATE_DELIVERY),
    switchMap(
      (action: DeliveryBoyActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/delivery/' + (<Delivery>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new DeliveryUpdated(<Delivery>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
