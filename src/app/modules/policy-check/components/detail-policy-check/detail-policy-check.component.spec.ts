import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPolicyCheckComponent } from './detail-policy-check.component';

describe('DetailPolicyCheckComponent', () => {
  let component: DetailPolicyCheckComponent;
  let fixture: ComponentFixture<DetailPolicyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPolicyCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPolicyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
