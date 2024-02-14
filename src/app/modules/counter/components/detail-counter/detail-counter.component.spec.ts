import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCounterComponent } from './detail-counter.component';

describe('DetailCounterComponent', () => {
  let component: DetailCounterComponent;
  let fixture: ComponentFixture<DetailCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
