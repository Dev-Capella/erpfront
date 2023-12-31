import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompositionComponentComponent } from './main-composition-component.component';

describe('MainCompositionComponentComponent', () => {
  let component: MainCompositionComponentComponent;
  let fixture: ComponentFixture<MainCompositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCompositionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCompositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
