import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPolicyCheckCategoryComponent } from './detail-policy-check-category.component';

describe('DetailPolicyCheckCategoryComponent', () => {
  let component: DetailPolicyCheckCategoryComponent;
  let fixture: ComponentFixture<DetailPolicyCheckCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPolicyCheckCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPolicyCheckCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
