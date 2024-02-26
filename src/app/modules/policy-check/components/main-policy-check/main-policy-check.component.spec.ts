import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPolicyCheckComponent } from './main-policy-check.component';

describe('MainPolicyCheckComponent', () => {
  let component: MainPolicyCheckComponent;
  let fixture: ComponentFixture<MainPolicyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPolicyCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPolicyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
