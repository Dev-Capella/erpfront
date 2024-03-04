import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrderPartnerComponent } from './main-order-partner.component';

describe('MainOrderPartnerComponent', () => {
  let component: MainOrderPartnerComponent;
  let fixture: ComponentFixture<MainOrderPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOrderPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainOrderPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
