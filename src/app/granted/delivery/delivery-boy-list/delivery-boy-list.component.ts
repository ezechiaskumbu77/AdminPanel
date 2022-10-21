import { combineAll } from 'rxjs-compat/operator/combineAll';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, combineLatest } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { LoadDeliveryBoys, SelectDeliveryBoy, SetAvaillabilityCategory, SetDeliveryBoyCategory } from './store/delivery-boys.actions';
import { selectSelectedDeliveryBoy } from './store/delivery-boys.reducer';

@Component({
  selector: 'app-delivery-boy-list',
  templateUrl: './delivery-boy-list.component.html',
  styleUrls: ['./delivery-boy-list.component.scss']
})
export class DeliveryBoyListComponent implements OnInit {

  deliveryBoys$ = this.store.select((state: AppState) => state.deliveryBoyState.deliveryBoys);
  category$ = this.store.select((state: AppState) => state.deliveryBoyState.category);
  selectedDeliveryBoy$ = this.store.select(selectSelectedDeliveryBoy);
  availabilityCategory$ = this.store.select((state: AppState) => state.deliveryBoyState.availlabilityCategory);

  @Input('renderContext')
  renderContext: string = 'normal';

  @ViewChild('pending', { static: false }) pending: ElementRef<HTMLButtonElement>;
  @ViewChild('agreed', { static: false }) agreed: ElementRef<HTMLButtonElement>;
  @ViewChild('rejected', { static: false }) rejected: ElementRef<HTMLButtonElement>;
  @ViewChild('banned', { static: false }) banned: ElementRef<HTMLButtonElement>;


  @ViewChild('availlable', { static: false }) availlable: ElementRef<HTMLButtonElement>;
  @ViewChild('all', { static: false }) all: ElementRef<HTMLButtonElement>;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.category$.pipe(take(1)).subscribe(
      (cat) => {
        if (<ElementRef<HTMLButtonElement>>this[cat] != undefined)
          (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus()
      }
    )

    this.availabilityCategory$.pipe(
      take(1)
    ).subscribe(
      (av) => {
        if (av) {
          if (<ElementRef<HTMLButtonElement>>this.availlable != undefined)
            (<ElementRef<HTMLButtonElement>>this.availlable).nativeElement.focus()
        }
        else {
          if (<ElementRef<HTMLButtonElement>>this.all != undefined)
            (<ElementRef<HTMLButtonElement>>this.all).nativeElement.focus()
        }
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
    if (this.renderContext == 'normal') this.store.dispatch(new SetAvaillabilityCategory(false));
    combineLatest(
      this.category$,
      this.availabilityCategory$

    )
      .subscribe(
        (context) => {
          let [cat, availlability] = context;
          if (this.renderContext == 'normal') {
            this.store.dispatch(new LoadDeliveryBoys({ category: cat, availability: false }))
          } else this.store.dispatch(new LoadDeliveryBoys({ category: 'pending', availability: availlability }))
        }
      )

  }

  select(deliveryBoyId: string) {
    this.store.dispatch(new SelectDeliveryBoy(deliveryBoyId))
  }

  setDeliveryBoysCategory(category: CollaborationStatusEnum) {
    this.store.dispatch(new SetDeliveryBoyCategory(category));
  }


  setAvaillabilityCategory(category: boolean) {
    this.store.dispatch(new SetAvaillabilityCategory(category))
  }

}
