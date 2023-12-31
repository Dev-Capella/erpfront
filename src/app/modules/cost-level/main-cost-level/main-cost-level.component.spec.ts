import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCostLevelComponent } from './main-cost-level.component';

describe('MainCostLevelComponent', () => {
  let component: MainCostLevelComponent;
  let fixture: ComponentFixture<MainCostLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCostLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCostLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
