import { Router } from '@angular/router';
import { UpdateDelivery } from './../delivery-boy-list/store/delivery-boys.actions';
import { User } from './../../../user/login/model/user.model';
import { by } from 'protractor';
import { HistoricalItem } from './../../../model/historical-item';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { OrderActionsType, SetOrderCategory } from './../../commands/store/commands.actions';

import { Actions, ofType } from '@ngrx/effects';
import { Order, OrderStatusEnum } from './../../commands/model/order.model';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectSelectedDeliveryBoy } from '../delivery-boy-list/store/delivery-boys.reducer';
import { DeliveryBoy } from '../model/delivery-boy.model';
import { Delivery } from '../model/delivery.model';
import { AddDelivery, DeliveryBoyActionsType } from '../delivery-boy-list/store/delivery-boys.actions';
import { take, withLatestFrom } from 'rxjs/operators';
import { OrderUpdated, UpdateOrder } from '../../commands/store/commands.actions';
import { selectLogedInUser } from 'src/app/user/login/store/user.reducer';
import { RemoteDeliveryFromOrderIdPipe } from 'src/app/utils/remote-delivery-from-order-id.pipe';

@Component({
  selector: 'app-dialog-delivery-boy',
  templateUrl: './dialog-delivery-boy.component.html',
  styleUrls: ['./dialog-delivery-boy.component.scss']
})
export class DialogDeliveryBoyComponent implements OnInit {

  renderContext = 'dialog';
  order: Order = null;
  selectedDeliveryBoy$ = this.store.select(selectSelectedDeliveryBoy);
  logedInUser$ = this.store.select(selectLogedInUser);

  constructor(
    private store: Store<AppState>,
    private modal: NgbActiveModal,
    private actions: Actions,
    private remoteDeliveryFromOrderIdPipe: RemoteDeliveryFromOrderIdPipe,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async associateToOrder(deliveryBoy: DeliveryBoy) {

    let delivery: Delivery | null = await this.remoteDeliveryFromOrderIdPipe.transform(this.order._id).toPromise();


    if (delivery == null) {
      delivery = {
        shopId: this.order.shop,
        OrderId: this.order._id,
        DeliverdBy: deliveryBoy._id,
        delivery: {
          isDelivered: false
        }

      }
      this.store.dispatch(new AddDelivery(delivery));
    }
    else {
      let deliveryMirror: Delivery = { ...delivery };
      deliveryMirror.DeliverdBy = deliveryBoy._id;
      deliveryMirror.accepted = null;
      deliveryMirror.whenAssigned = new Date().toISOString();
      this.store.dispatch(new UpdateDelivery(deliveryMirror));
    }

    this.actions.pipe(ofType(DeliveryBoyActionsType.DELIVERY_ADDED, DeliveryBoyActionsType.DELIVERY_UPDATED),
      withLatestFrom(this.logedInUser$),
      take(1))
      .subscribe(
        (bundle) => {
          let d: Delivery = bundle[0];
          let u: User = bundle[1];
          let orderMirror = { ...this.order };
          orderMirror.deliverCode = d._id
          orderMirror.status = 'accepted';
          if (delivery == null) {
            let hi: HistoricalItem = {
              status: 'accepted',
              by: u._id
            };
            let ch = orderMirror.historical.slice();
            ch.push(hi);
            orderMirror.historical = ch;
          }


          this.store.dispatch(new UpdateOrder(orderMirror))
          this.actions.pipe(ofType(OrderActionsType.ORDER_UPDATED), take(1))
            .subscribe(
              o => {
                this.modal.close();
              }
            )
        }
      )
  }

}
