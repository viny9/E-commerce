import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProductPromotionComponent } from './dialog-add-product-promotion.component';

describe('DialogAddProductPromotionComponent', () => {
  let component: DialogAddProductPromotionComponent;
  let fixture: ComponentFixture<DialogAddProductPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddProductPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProductPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
