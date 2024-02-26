import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPolicyCheckCategoryComponent } from './main-policy-check-category.component';

describe('MainPolicyCheckCategoryComponent', () => {
  let component: MainPolicyCheckCategoryComponent;
  let fixture: ComponentFixture<MainPolicyCheckCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPolicyCheckCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPolicyCheckCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
