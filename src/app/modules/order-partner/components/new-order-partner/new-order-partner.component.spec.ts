import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderPartnerComponent } from './new-order-partner.component';

describe('NewOrderPartnerComponent', () => {
  let component: NewOrderPartnerComponent;
  let fixture: ComponentFixture<NewOrderPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewOrderPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
