import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCounterTypeComponent } from './detail-counter-type.component';

describe('DetailCounterTypeComponent', () => {
  let component: DetailCounterTypeComponent;
  let fixture: ComponentFixture<DetailCounterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCounterTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCounterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
