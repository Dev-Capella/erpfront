import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCostCategoryComponent } from './detail-cost-category.component';

describe('DetailCostCategoryComponent', () => {
  let component: DetailCostCategoryComponent;
  let fixture: ComponentFixture<DetailCostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCostCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
