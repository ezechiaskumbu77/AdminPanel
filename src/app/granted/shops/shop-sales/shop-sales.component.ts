import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions } from '@ngrx/effects';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shop-sales',
  templateUrl: './shop-sales.component.html',
  styleUrls: ['./shop-sales.component.scss']
})
export class ShopSalesComponent implements OnInit {

  shopId$: BehaviorSubject<string> = new BehaviorSubject(null);
  view = 'sales';

  constructor(
    private _activatedRoutet: ActivatedRoute,
    private _modalService: NgbModal,
    private _actions: Actions,
    private router: Router
  ) { }

  ngOnInit() {
    this.shopId$.next(this._activatedRoutet.parent.snapshot.params['id']);
  }

}
