
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { customEnvironment } from 'src/environments/custom-environment';
import { ShopSale } from '../model/shop-sale.model';
import { ShopSaleActionsType, ShopSaleActions, ShopSalesLoaded, ShopSaleUpdated, LoadShopSales } from './shop-sales.actions';

@Injectable()
export class ShopSaleEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadShopSale = this.actions.pipe(
    ofType(ShopSaleActionsType.LOAD_SHOP_SALES),
    switchMap(
      (action: LoadShopSales) => {
        let advancedPath = customEnvironment.BASE_URL + '/saleshop/?shop=' + action.payload.shop;
        if (action.payload.from) advancedPath += '&date[gte]=' + action.payload.from;
        if (action.payload.to) advancedPath += '&date[lte]=' + action.payload.to;
        if (action.payload.product && action.payload.product != 'null') {
          advancedPath += '&shopproduct=' + action.payload.product;
        }
        return this.http.get<any>(advancedPath, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ShopSalesLoaded(response.data));
            }
            )
          )
      }

    )
  )

  @Effect()
  updateShopSale = this.actions.pipe(
    ofType(ShopSaleActionsType.UPDATE_SHOP_SALE),
    switchMap(
      (action: ShopSaleActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/saleshop/' + (<ShopSale>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new ShopSaleUpdated(<ShopSale>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )
}
