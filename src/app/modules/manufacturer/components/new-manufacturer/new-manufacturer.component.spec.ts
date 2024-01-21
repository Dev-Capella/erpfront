import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManufacturerComponent } from './new-manufacturer.component';

describe('NewManufacturerComponent', () => {
  let component: NewManufacturerComponent;
  let fixture: ComponentFixture<NewManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewManufacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
