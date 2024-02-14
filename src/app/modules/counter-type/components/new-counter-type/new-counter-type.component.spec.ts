import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounterTypeComponent } from './new-counter-type.component';

describe('NewCounterTypeComponent', () => {
  let component: NewCounterTypeComponent;
  let fixture: ComponentFixture<NewCounterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCounterTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCounterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
