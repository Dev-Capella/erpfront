import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCostLevelComponent } from './new-cost-level.component';

describe('NewCostLevelComponent', () => {
  let component: NewCostLevelComponent;
  let fixture: ComponentFixture<NewCostLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCostLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCostLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
