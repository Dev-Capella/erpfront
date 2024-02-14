import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCounterComponent } from './main-counter.component';

describe('MainCounterComponent', () => {
  let component: MainCounterComponent;
  let fixture: ComponentFixture<MainCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
