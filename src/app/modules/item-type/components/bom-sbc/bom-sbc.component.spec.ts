import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomSbcComponent } from './bom-sbc.component';

describe('BomSbcComponent', () => {
  let component: BomSbcComponent;
  let fixture: ComponentFixture<BomSbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomSbcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BomSbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
