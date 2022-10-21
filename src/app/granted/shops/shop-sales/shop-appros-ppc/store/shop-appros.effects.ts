
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { customEnvironment } from 'src/environments/custom-environment';
import { Order } from 'src/app/granted/commands/model/order.model';
import { ShopApprosActionsType, ShopApprosActions, ShopApprosUpdated, LoadShopAppros, ShopApprosLoaded } from './shop-appros.actions';

@Injectable()
export class ShopApprosEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadShopAppros = this.actions.pipe(
    ofType(ShopApprosActionsType.LOAD_SHOP_APPROS),
    switchMap(
      (action: LoadShopAppros) => {
        let advancedPath = customEnvironment.BASE_URL + '/order/?shop=' + action.payload.shop+'&status=pending';
        if (action.payload.from) advancedPath += '&date[gte]=' + action.payload.from;
        if (action.payload.to) advancedPath += '&date[lte]=' + action.payload.to;
        if (action.payload.product && action.payload.product != 'null') {
          advancedPath += '&shopproduct=' + action.payload.product;
        }
        return this.http.get<any>(advancedPath, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ShopApprosLoaded(response.data));
            }
            )
          )
      }

    )
  )

  @Effect()
  updateShopAppros = this.actions.pipe(
    ofType(ShopApprosActionsType.UPDATE_SHOP_SALE),
    switchMap(
      (action: ShopApprosActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/saleshop/' + (<Order>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new ShopApprosUpdated(<Order>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
