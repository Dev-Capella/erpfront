import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUomComponent } from './data-uom.component';

describe('DetailUomComponent', () => {
  let component: DataUomComponent;
  let fixture: ComponentFixture<DataUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
