import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounterComponent } from './new-counter.component';

describe('NewCounterComponent', () => {
  let component: NewCounterComponent;
  let fixture: ComponentFixture<NewCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
