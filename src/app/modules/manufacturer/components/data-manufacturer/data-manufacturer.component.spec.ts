import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManufacturerComponent } from './data-manufacturer.component';

describe('DataManufacturerComponent', () => {
  let component: DataManufacturerComponent;
  let fixture: ComponentFixture<DataManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataManufacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
