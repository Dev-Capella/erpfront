import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostLevelListComponent } from './cost-level-list.component';

describe('CostLevelListComponent', () => {
  let component: CostLevelListComponent;
  let fixture: ComponentFixture<CostLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostLevelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
