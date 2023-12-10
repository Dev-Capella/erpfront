import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSubcodeComponent } from './data-subcode.component';

describe('DataSubcodeComponent', () => {
  let component: DataSubcodeComponent;
  let fixture: ComponentFixture<DataSubcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSubcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSubcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
