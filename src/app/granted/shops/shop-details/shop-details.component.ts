import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { DeliveryBoyActionsType, DeliveryUpdated } from '../../delivery/delivery-boy-list/store/delivery-boys.actions';
import { DialogDeliveryBoyComponent } from '../../delivery/dialog-delivery-boy/dialog-delivery-boy.component';
import { Shop } from '../model/shop.model';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  shopId$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private _activatedRoutet: ActivatedRoute,
    private _modalService: NgbModal,
    private _actions: Actions,
    private router: Router
  ) { }

  ngOnInit() {
    this.shopId$.next(this._activatedRoutet.snapshot.params['id']);


  }



}
