import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainManufacturerComponent } from './main-manufacturer.component';

describe('MainManufacturerComponent', () => {
  let component: MainManufacturerComponent;
  let fixture: ComponentFixture<MainManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainManufacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
