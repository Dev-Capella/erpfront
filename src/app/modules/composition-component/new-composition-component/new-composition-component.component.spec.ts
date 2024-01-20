import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompositionComponentComponent } from './new-composition-component.component';

describe('NewCompositionComponentComponent', () => {
  let component: NewCompositionComponentComponent;
  let fixture: ComponentFixture<NewCompositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCompositionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCompositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
