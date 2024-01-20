import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCostCategoryComponent } from './new-cost-category.component';

describe('NewCostCategoryComponent', () => {
  let component: NewCostCategoryComponent;
  let fixture: ComponentFixture<NewCostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCostCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
