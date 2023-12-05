import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUomComponent } from './detail-uom.component';

describe('DetailUomComponent', () => {
  let component: DetailUomComponent;
  let fixture: ComponentFixture<DetailUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
