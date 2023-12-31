import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCategoryListComponent } from './cost-category-list.component';

describe('CostCategoryListComponent', () => {
  let component: CostCategoryListComponent;
  let fixture: ComponentFixture<CostCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
