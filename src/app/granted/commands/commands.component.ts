import { HistoricalItem } from 'src/app/model/historical-item';
import { selectLogedInUser } from 'src/app/user/login/store/user.reducer';
import { Actions, ofType, act } from '@ngrx/effects';
import { DialogDeliveryBoyComponent } from './../delivery/dialog-delivery-boy/dialog-delivery-boy.component';
import { Order, OrderStatusEnum } from './model/order.model';
import { selectOrders, selectSelectedOrder } from './store/commands.reducer';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoadOrders, SelectOrder, SetOrderCategory, OrderActionsType, OrderUpdated, UpdateOrder } from './store/commands.actions';
import { take, withLatestFrom } from 'rxjs/operators';
import { NgbModal, NgbModalRef, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryAdded, DeliveryBoyActionsType, DeliveryUpdated } from '../delivery/delivery-boy-list/store/delivery-boys.actions';
import { DialogCancelOrderComponent } from './dialog-cancel-order/dialog-cancel-order.component';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit, AfterViewInit {
  orders$ = this.store.select(selectOrders);
  category$ = this.store.select((state: AppState) => state.orderState.category);

  selectedOrder$ = this.store.select(selectSelectedOrder);
  @ViewChild('pending', { static: false }) pending: ElementRef<HTMLButtonElement>;
  @ViewChild('accepted', { static: false }) accepted: ElementRef<HTMLButtonElement>;
  @ViewChild('shiped', { static: false }) shiped: ElementRef<HTMLButtonElement>;
  @ViewChild('delivered', { static: false }) delivered: ElementRef<HTMLButtonElement>;
  @ViewChild('issue', { static: false }) issue: ElementRef<HTMLButtonElement>;
  @ViewChild('canceled', { static: false }) canceled: ElementRef<HTMLButtonElement>;


  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.category$.pipe(take(1)).subscribe(
      (cat) => {
        (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus();
      }
    )
  }




  constructor(private store: Store<AppState>, private _modalService: NgbModal, private _actions: Actions) { }
  ngAfterViewInit(): void {


    this.category$.subscribe(
      (cat) => {
        (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus();

      }
    )
  }

  ngOnInit() {
    this.category$.subscribe(
      (cat) => this.store.dispatch(new LoadOrders(cat))
    )

    this._actions.pipe(
      ofType(
        OrderActionsType.ORDER_ADDED,
        OrderActionsType.ORDER_UPDATED
      ),
      withLatestFrom(this.category$)
    ).subscribe(
      ([action, currentCategory]) => {
        let actionCategory = (<OrderUpdated>action).payload.status;
        if (actionCategory == currentCategory) location.reload();
        else
          this.store.dispatch(new SetOrderCategory(<OrderStatusEnum>actionCategory))
      }
    )

  }

  select(orderId: string) {
    this.store.dispatch(new SelectOrder(orderId))
  }

  setOrderscategory(category: OrderStatusEnum) {
    this.store.dispatch(new SetOrderCategory(category));
  }

  evaluate(val: string): Object {
    console.log(val)
    return eval(val)
  }

  assignOrderToDelivery(order: Order) {
    let mr: NgbModalRef = this._modalService.open(
      DialogDeliveryBoyComponent,
      { size: 'lg' }
    )
    mr.componentInstance.renderContext = 'dialog';
    mr.componentInstance.order = order
  }

  getAcceptationFromOrder(order: Order) {
    let co = order.historical.find(h => h.status == OrderStatusEnum.accepted)
    return co != undefined ? co.created : null
  }

  cancelOrder(
    order: Order
  ) {
    this._modalService.open(DialogCancelOrderComponent).componentInstance.order = order
  }


}
