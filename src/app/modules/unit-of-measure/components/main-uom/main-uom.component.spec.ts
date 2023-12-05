import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUomComponent } from './main-uom.component';

describe('MainUomComponent', () => {
  let component: MainUomComponent;
  let fixture: ComponentFixture<MainUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
