import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPolicyCheckCategoryComponent } from './new-policy-check-category.component';

describe('NewPolicyCheckCategoryComponent', () => {
  let component: NewPolicyCheckCategoryComponent;
  let fixture: ComponentFixture<NewPolicyCheckCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPolicyCheckCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPolicyCheckCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
