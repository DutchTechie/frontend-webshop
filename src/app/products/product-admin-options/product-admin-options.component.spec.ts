import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminOptionsComponent } from './product-admin-options.component';

describe('ProductAdminOptionsComponent', () => {
  let component: ProductAdminOptionsComponent;
  let fixture: ComponentFixture<ProductAdminOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdminOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdminOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
