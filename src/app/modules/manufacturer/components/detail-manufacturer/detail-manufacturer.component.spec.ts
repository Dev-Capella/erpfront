import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManufacturerComponent } from './detail-manufacturer.component';

describe('DetailManufacturerComponent', () => {
  let component: DetailManufacturerComponent;
  let fixture: ComponentFixture<DetailManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailManufacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
