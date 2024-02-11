import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParameterComponent } from './detail-parameter.component';

describe('DetailParameterComponent', () => {
  let component: DetailParameterComponent;
  let fixture: ComponentFixture<DetailParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailParameterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
