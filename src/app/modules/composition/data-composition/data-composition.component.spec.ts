import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCompositionComponent } from './data-composition.component';

describe('DataCompositionComponent', () => {
  let component: DataCompositionComponent;
  let fixture: ComponentFixture<DataCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCompositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
