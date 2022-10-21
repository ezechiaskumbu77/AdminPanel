import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopApprosOtherComponent } from './shop-appros-other.component';

describe('ShopApprosOtherComponent', () => {
  let component: ShopApprosOtherComponent;
  let fixture: ComponentFixture<ShopApprosOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopApprosOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopApprosOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
