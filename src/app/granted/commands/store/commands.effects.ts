import { customEnvironment } from '../../../../environments/custom-environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { OrderActions, OrderActionsType, OrdersLoaded, OrderUpdated } from './commands.actions';
import { Order } from '../model/order.model';

@Injectable()
export class OrderEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadOrder = this.actions.pipe(
    ofType(OrderActionsType.LOAD_ORDERS),
    switchMap(
      (action: OrderActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/orderppc/?status=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new OrdersLoaded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  updateOrder = this.actions.pipe(
    ofType(OrderActionsType.UPDATE_ORDER),
    switchMap(
      (action: OrderActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/orderppc/' + (<Order>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new OrderUpdated(<Order>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
