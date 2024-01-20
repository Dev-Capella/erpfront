import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompositionComponentComponent } from './detail-composition-component.component';

describe('DetailCompositionComponentComponent', () => {
  let component: DetailCompositionComponentComponent;
  let fixture: ComponentFixture<DetailCompositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCompositionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCompositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
