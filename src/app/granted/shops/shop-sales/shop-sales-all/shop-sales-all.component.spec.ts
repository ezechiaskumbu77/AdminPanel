import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSalesAllComponent } from './shop-sales-all.component';

describe('ShopSalesAllComponent', () => {
  let component: ShopSalesAllComponent;
  let fixture: ComponentFixture<ShopSalesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSalesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSalesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
