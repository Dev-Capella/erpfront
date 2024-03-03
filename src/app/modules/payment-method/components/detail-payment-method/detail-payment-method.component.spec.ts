import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaymentMethodComponent } from './detail-payment-method.component';

describe('DetailPaymentMethodComponent', () => {
  let component: DetailPaymentMethodComponent;
  let fixture: ComponentFixture<DetailPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPaymentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
