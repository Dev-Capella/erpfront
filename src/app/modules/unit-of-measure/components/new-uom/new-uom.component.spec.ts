import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUomComponent } from './new-uom.component';

describe('NewUomComponent', () => {
  let component: NewUomComponent;
  let fixture: ComponentFixture<NewUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
