import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPolicyCheckComponent } from './new-policy-check.component';

describe('NewPolicyCheckComponent', () => {
  let component: NewPolicyCheckComponent;
  let fixture: ComponentFixture<NewPolicyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPolicyCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPolicyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
