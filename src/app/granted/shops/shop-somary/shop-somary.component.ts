import { Component, OnInit, AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions } from '@ngrx/effects';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shop-somary',
  templateUrl: './shop-somary.component.html',
  styleUrls: ['./shop-somary.component.scss']
})
export class ShopSomaryComponent implements OnInit {

  shopId$: BehaviorSubject<string> = new BehaviorSubject(null);

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
