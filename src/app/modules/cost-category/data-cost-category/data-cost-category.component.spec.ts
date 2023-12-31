import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCostCategoryComponent } from './data-cost-category.component';

describe('DataCostCategoryComponent', () => {
  let component: DataCostCategoryComponent;
  let fixture: ComponentFixture<DataCostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCostCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
