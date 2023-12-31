import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionDetailListComponent } from './composition-detail-list.component';

describe('CompositionDetailListComponent', () => {
  let component: CompositionDetailListComponent;
  let fixture: ComponentFixture<CompositionDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompositionDetailListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompositionDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
