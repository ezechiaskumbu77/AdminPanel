import { withLatestFrom } from 'rxjs/operators';
import { DeliveryBoyActions, DeliveryBoyActionsType, DeliveryUpdated } from './../../delivery/delivery-boy-list/store/delivery-boys.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogDeliveryBoyComponent } from '../../delivery/dialog-delivery-boy/dialog-delivery-boy.component';
import { Order } from '../model/order.model';
import { DialogCancelOrderComponent } from '../dialog-cancel-order/dialog-cancel-order.component';

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.scss']
})
export class CommandDetailsComponent implements OnInit {

  commandId$: BehaviorSubject<string> = new BehaviorSubject(null);

  lat = -4.3555936;
  lng = 15.3026062;

  constructor(
    private _activatedRoutet: ActivatedRoute,
    private _modalService: NgbModal,
    private _actions: Actions,
    private router: Router
  ) { }

  ngOnInit() {
    this.commandId$.next(this._activatedRoutet.snapshot.params['id']);

    this._actions.pipe(
      ofType(
        DeliveryBoyActionsType.DELIVERY_UPDATED,
        DeliveryBoyActionsType.DELIVERY_ADDED
      ),
      withLatestFrom(this.commandId$)
    ).subscribe(
      ([act, cId]) => {
        if ((<DeliveryUpdated>act).payload.OrderId == cId) {
          location.reload();
        }
      }
    )
  }

  assignOrderToDelivery(order: Order) {
    let mr: NgbModalRef = this._modalService.open(
      DialogDeliveryBoyComponent,
      { size: 'lg' }
    )
    mr.componentInstance.renderContext = 'dialog';
    mr.componentInstance.order = order
  }

  cancelOrder(order: Order) {
    this._modalService.open(DialogCancelOrderComponent).componentInstance.order = order
  }

}
