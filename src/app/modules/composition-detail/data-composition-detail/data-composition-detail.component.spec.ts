import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCompositionDetailComponent } from './data-composition-detail.component';

describe('DataCompositionDetailComponent', () => {
  let component: DataCompositionDetailComponent;
  let fixture: ComponentFixture<DataCompositionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCompositionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCompositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
