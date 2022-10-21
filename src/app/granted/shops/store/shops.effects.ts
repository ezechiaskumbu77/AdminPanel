import { customEnvironment } from '../../../../environments/custom-environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ShopActions, ShopActionsType, ShopsLoaded, ShopUpdated } from './shops.actions';
import { Shop } from '../model/shop.model';

@Injectable()
export class ShopEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadShop = this.actions.pipe(
    ofType(ShopActionsType.LOAD_SHOPS),
    switchMap(
      (action: ShopActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/shop/?status=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ShopsLoaded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  updateShop = this.actions.pipe(
    ofType(ShopActionsType.UPDATE_SHOP),
    switchMap(
      (action: ShopActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/shop/' + (<Shop>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new ShopUpdated(<Shop>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
