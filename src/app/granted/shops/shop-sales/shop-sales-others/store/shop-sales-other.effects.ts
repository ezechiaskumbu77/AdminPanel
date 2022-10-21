
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { customEnvironment } from 'src/environments/custom-environment';
import { ShopSaleOther } from '../model/shop-sale-other.model';
import { ShopSaleOtherActionsType, ShopSaleOtherActions, ShopSaleOthersLoaded, ShopSaleOtherUpdated, LoadShopSaleOthers } from './shop-sales-other.actions';

@Injectable()
export class ShopSaleOtherEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadShopSaleOther = this.actions.pipe(
    ofType(ShopSaleOtherActionsType.LOAD_SHOP_SALE_OTHERS),
    switchMap(
      (action: LoadShopSaleOthers) => {
        let advancedPath = customEnvironment.BASE_URL + '/salestock/?shop=' + action.payload.shop;
        if (action.payload.from) advancedPath += '&date[gte]=' + action.payload.from;
        if (action.payload.to) advancedPath += '&date[lte]=' + action.payload.to;
        if (action.payload.product && action.payload.product != 'null') {
          advancedPath += '&productStock=' + action.payload.product;
        }

        return this.http.get<any>(advancedPath, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ShopSaleOthersLoaded(response.data));
            }
            )
          )
      }

    )
  )

  @Effect()
  updateShopSaleOther = this.actions.pipe(
    ofType(ShopSaleOtherActionsType.UPDATE_SHOP_SALE_OTHER),
    switchMap(
      (action: ShopSaleOtherActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/saleshop/' + (<ShopSaleOther>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new ShopSaleOtherUpdated(<ShopSaleOther>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
