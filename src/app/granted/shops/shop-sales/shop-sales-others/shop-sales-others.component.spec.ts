import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSalesOthersComponent } from './shop-sales-others.component';

describe('ShopSalesOthersComponent', () => {
  let component: ShopSalesOthersComponent;
  let fixture: ComponentFixture<ShopSalesOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSalesOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSalesOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
