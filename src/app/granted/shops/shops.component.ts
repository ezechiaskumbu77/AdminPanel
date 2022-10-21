import { CollaborationStatusEnum } from './../../model/collaboration-status.enum';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoadShops, SelectShop, SetShopCategory } from './store/shops.actions';
import { selectSelectedShop } from './store/shops.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit, AfterViewInit {

  shops$ = this.store.select((state: AppState) => state.shopState.shops);
  category$ = this.store.select((state: AppState) => state.shopState.category);
  selectedShop$ = this.store.select(selectSelectedShop);
  @ViewChild('pending', { static: false }) pending: ElementRef<HTMLButtonElement>;
  @ViewChild('agreed', { static: false }) agreed: ElementRef<HTMLButtonElement>;
  @ViewChild('rejected', { static: false }) rejected: ElementRef<HTMLButtonElement>;
  @ViewChild('banned', { static: false }) banned: ElementRef<HTMLButtonElement>;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.category$.pipe(take(1)).subscribe(
      (cat) => {
        console.log(cat);
        if (<ElementRef<HTMLButtonElement>>this[cat] != undefined)
          (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus()
      }
    )
  }

  ngAfterViewInit(): void {
    this.category$.subscribe(
      (cat) => {
        if (<ElementRef<HTMLButtonElement>>this[cat] != undefined) (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus()
      }
    )
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.category$.subscribe(
      (cat) => this.store.dispatch(new LoadShops(cat))
    )
  }

  select(shopId: string) {
    this.store.dispatch(new SelectShop(shopId))
  }

  setShopscategory(category: CollaborationStatusEnum) {
    this.store.dispatch(new SetShopCategory(category));
  }


}

