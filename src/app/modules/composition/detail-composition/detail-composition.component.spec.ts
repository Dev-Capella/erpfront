import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompositionComponent } from './detail-composition.component';

describe('DetailCompositionComponent', () => {
  let component: DetailCompositionComponent;
  let fixture: ComponentFixture<DetailCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCompositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
