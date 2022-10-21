import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbInputDatepicker, NgbDate, NgbModal, NgbCalendar, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SetDateRangeSales } from '../shop-sales-ppc/store/shop-sales.actions';

@Component({
  selector: 'app-shop-appros-all',
  templateUrl: './shop-appros-all.component.html',
  styleUrls: ['./shop-appros-all.component.scss']
})
export class ShopApprosAllComponent implements OnInit {

  @Input('shopId') shopId;
  @ViewChild('content', { static: false }) content;
  @ViewChild('d', { static: false }) d: NgbInputDatepicker;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  fromSales: Date;
  toSales: Date;

  constructor(
    private _modalService: NgbModal,
    calendar: NgbCalendar,
    private _dateAdapter: NgbDateNativeAdapter,
    private _store: Store<AppState>
  ) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  showRangeSelector() {
    this._modalService.open(this.content, { centered: true })
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.d.close();
      this.setSalesContext();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  setSalesContext() {

    this.fromSales = this._dateAdapter.toModel(this.fromDate);
    this.toSales = this._dateAdapter.toModel(this.toDate);
    this.fromSales.setHours(0);
    this.fromSales.setMinutes(0);
    this.fromSales.setSeconds(0);
    this.toSales.setHours(23)
    this.toSales.setMinutes(59);
    this.toSales.setSeconds(59);
    this._store.dispatch(new SetDateRangeSales({ from: this.fromSales, to: this.toSales }))
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
