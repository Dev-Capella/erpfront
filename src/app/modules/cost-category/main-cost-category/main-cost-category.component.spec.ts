import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCostCategoryComponent } from './main-cost-category.component';

describe('MainCostCategoryComponent', () => {
  let component: MainCostCategoryComponent;
  let fixture: ComponentFixture<MainCostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCostCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
