import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { HistoricalItem } from 'src/app/model/historical-item';
import { selectLogedInUser } from 'src/app/user/login/store/user.reducer';
import { Order } from '../model/order.model';
import { UpdateOrder } from '../store/commands.actions';

@Component({
  selector: 'app-dialog-cancel-order',
  templateUrl: './dialog-cancel-order.component.html',
  styleUrls: ['./dialog-cancel-order.component.scss']
})
export class DialogCancelOrderComponent implements OnInit {
  order: Order;
  logedInUser$ = this.store.select(selectLogedInUser);

  constructor(public modal: NgbActiveModal,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }


  cancelOrder(
    order: Order
  ) {
    if (order.status == 'pending') {

      this.logedInUser$.pipe(take(1)).subscribe(
        (liu) => {
          let om = { ...order };
          om.status = 'canceled';
          let hm = om.historical.slice();
          let hi: HistoricalItem = {
            status: 'canceled',
            by: liu._id
          };
          hm.push(hi);
          om.historical = hm;

          this.store.dispatch(new UpdateOrder(om));
          this.modal.close();
        }
      )
    }
  }

}
