import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoadShopAppros } from './store/shop-appros.actions';
import { selectShopAppros } from './store/shop-appros.reducer';

@Component({
  selector: 'app-shop-appros-ppc',
  templateUrl: './shop-appros-ppc.component.html',
  styleUrls: ['./shop-appros-ppc.component.scss']
})
export class ShopApprosPpcComponent implements OnInit {

  shopAppros$ = this._store.select(selectShopAppros);

  @Input('shopId') shopId;
  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(new LoadShopAppros(this.shopId))
    this.shopAppros$.subscribe(
      sa=>console.log('sa', sa)
    )
  }

}
