import { RemoteProductStockByIdPipe } from './../../../../utils/remote-product-stock-by-id.pipe';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectCurrentDateRange, selectShopSales } from '../shop-sales-ppc/store/shop-sales.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoadShopSales, SetDateRangeSales, ShopSaleActionsType } from '../shop-sales-ppc/store/shop-sales.actions';
import { LoadShopSaleOthers } from './store/shop-sales-other.actions';
import { selectShopSaleOthers } from './store/shop-sales-other.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { FormControl } from '@angular/forms';
import { withLatestFrom, startWith } from 'rxjs/operators';
import { RemoteShopProductByShopIdPipe } from 'src/app/utils/remote-shop-product-by-shop-id.pipe';
import { RemoteProductsStockByShopIdPipe } from 'src/app/utils/remote-products-stock-by-shop-id.pipe';

@Component({
  selector: 'app-shop-sales-others',
  templateUrl: './shop-sales-others.component.html',
  styleUrls: ['./shop-sales-others.component.scss']
})
export class ShopSalesOthersComponent implements OnInit {

  shopSales$ = this._store.select(selectShopSaleOthers);
  shopProducts$: Observable<any>;
  @Input('shopId') shopId;
  selectedProductOthers = new FormControl();
  productValueObservable$: Observable<any>;
  currentDateRange$ = this._store.select(selectCurrentDateRange)

  constructor(private _store: Store<AppState>, private _actions$: Actions, private _remoteShopProductByShopIdPipe: RemoteProductsStockByShopIdPipe) { }

  ngOnInit() {
    this._store.dispatch(new LoadShopSaleOthers({ shop: this.shopId }));
    this.shopProducts$ = this._remoteShopProductByShopIdPipe.transform(this.shopId);
    this._actions$.pipe(
      ofType(ShopSaleActionsType.SET_DATE_RANGE_SALES)
    ).
      pipe(
        withLatestFrom(this.selectedProductOthers.valueChanges.pipe(startWith(null)))
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
    this.selectedProductOthers.valueChanges.pipe(
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
    this._store.dispatch(new LoadShopSaleOthers(payload))
  }
}
