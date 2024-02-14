import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCounterTypeComponent } from './main-counter-type.component';

describe('MainCounterTypeComponent', () => {
  let component: MainCounterTypeComponent;
  let fixture: ComponentFixture<MainCounterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCounterTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCounterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
