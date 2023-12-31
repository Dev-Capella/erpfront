import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionComponentListComponent } from './composition-component-list.component';

describe('CompositionComponentListComponent', () => {
  let component: CompositionComponentListComponent;
  let fixture: ComponentFixture<CompositionComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompositionComponentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompositionComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
