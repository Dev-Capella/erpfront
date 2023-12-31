import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCostLevelComponent } from './data-cost-level.component';

describe('DataCostLevelComponent', () => {
  let component: DataCostLevelComponent;
  let fixture: ComponentFixture<DataCostLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCostLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCostLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
