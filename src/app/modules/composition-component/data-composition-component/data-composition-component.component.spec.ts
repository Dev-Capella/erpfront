import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCompositionComponentComponent } from './data-composition-component.component';

describe('DataCompositionComponentComponent', () => {
  let component: DataCompositionComponentComponent;
  let fixture: ComponentFixture<DataCompositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCompositionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCompositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
