import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCostLevelComponent } from './detail-cost-level.component';

describe('DetailCostLevelComponent', () => {
  let component: DetailCostLevelComponent;
  let fixture: ComponentFixture<DetailCostLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCostLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCostLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
