import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSeriesComponent } from './sub-series.component';

describe('SubSeriesComponent', () => {
  let component: SubSeriesComponent;
  let fixture: ComponentFixture<SubSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
