import { startWith, withLatestFrom } from 'rxjs/operators';
import { act, Actions, ofType } from '@ngrx/effects';
import { LoadShopSales, SetDateRangeSales, ShopSaleActions, ShopSaleActionsType } from './store/shop-sales.actions';
import { selectCurrentDateRange, selectShopSales } from './store/shop-sales.reducer';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { RemoteShopProductByShopIdPipe } from 'src/app/utils/remote-shop-product-by-shop-id.pipe';
import { fromEvent, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop-sales-ppc',
  templateUrl: './shop-sales-ppc.component.html',
  styleUrls: ['./shop-sales-ppc.component.scss']
})
export class ShopSalesPpcComponent implements OnInit {

  shopSales$ = this._store.select(selectShopSales);
  shopProducts$: Observable<any>;
  @Input('shopId') shopId;
  selectedProduct = new FormControl();
  productValueObservable$: Observable<any>;
  currentDateRange$ = this._store.select(selectCurrentDateRange)

  constructor(private _store: Store<AppState>, private _actions$: Actions, private _remoteShopProductByShopIdPipe: RemoteShopProductByShopIdPipe) { }

  ngOnInit() {
    this._store.dispatch(new LoadShopSales({ shop: this.shopId }));
    this.shopProducts$ = this._remoteShopProductByShopIdPipe.transform(this.shopId);
    this._actions$.pipe(
      ofType(ShopSaleActionsType.SET_DATE_RANGE_SALES)
    ).
      pipe(
        withLatestFrom(this.selectedProduct.valueChanges.pipe(startWith(null)))
      )
      .subscribe(
        ([act, selectedProduct]) => {
          let range = {
            fromSales: (<SetDateRangeSales>act).payload.from,
            toSales: (<SetDateRangeSales>act).payload.to
          }
          this._loadWithFilters(selectedProduct, range)
        }
      );
    this.selectedProduct.valueChanges.pipe(
      withLatestFrom(this.currentDateRange$)
    ).subscribe(
      ([selectedProduct, currentDateRange]) => {
        this._loadWithFilters(selectedProduct, currentDateRange)
      }
    )
  }

  _loadWithFilters(selectedProduct, currentDateRange) {
    let payload = { shop: this.shopId };
    if (currentDateRange) {
      payload['from'] = currentDateRange.fromSales.toISOString();
      payload['to'] = currentDateRange.toSales.toISOString();
    }
    if (selectedProduct) payload['product'] = selectedProduct;
    this._store.dispatch(new LoadShopSales(payload))
  }



}
