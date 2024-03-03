import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentMethodComponent } from './new-payment-method.component';

describe('NewPaymentMethodComponent', () => {
  let component: NewPaymentMethodComponent;
  let fixture: ComponentFixture<NewPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPaymentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
