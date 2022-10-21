import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopApprosPpcComponent } from './shop-appros-ppc.component';

describe('ShopApprosPpcComponent', () => {
  let component: ShopApprosPpcComponent;
  let fixture: ComponentFixture<ShopApprosPpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopApprosPpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopApprosPpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
