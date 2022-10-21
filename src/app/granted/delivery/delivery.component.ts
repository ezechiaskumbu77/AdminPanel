import { CollaborationStatusEnum } from './../../model/collaboration-status.enum';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { take } from 'rxjs/operators';
import { LoadDeliveryCorps, SelectDeliveryCorp, SetDeliveryCorpCategory } from './store/deliverys.actions';
import { selectSelectedDeliveryCorp } from './store/deliverys.reducer';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, AfterViewInit {
  deliveryCorps$ = this.store.select((state: AppState) => state.deliveryCorpState.deliveryCorps);
  category$ = this.store.select((state: AppState) => state.deliveryCorpState.category);
  selectedDeliveryCorp$ = this.store.select(selectSelectedDeliveryCorp);
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
      (cat) => this.store.dispatch(new LoadDeliveryCorps(cat))
    )
  }

  select(deliveryCorpId: string) {
    this.store.dispatch(new SelectDeliveryCorp(deliveryCorpId))
  }

  setDeliveryCorpscategory(category: CollaborationStatusEnum) {
    this.store.dispatch(new SetDeliveryCorpCategory(category));
  }
}
