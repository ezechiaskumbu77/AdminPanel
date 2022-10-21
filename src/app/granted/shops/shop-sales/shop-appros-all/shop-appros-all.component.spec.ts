import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopApprosAllComponent } from './shop-appros-all.component';

describe('ShopApprosAllComponent', () => {
  let component: ShopApprosAllComponent;
  let fixture: ComponentFixture<ShopApprosAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopApprosAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopApprosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
