import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderPartnerComponent } from './detail-order-partner.component';

describe('DetailOrderPartnerComponent', () => {
  let component: DetailOrderPartnerComponent;
  let fixture: ComponentFixture<DetailOrderPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOrderPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailOrderPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
