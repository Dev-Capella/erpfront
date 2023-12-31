import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompositionComponent } from './main-composition.component';

describe('MainCompositionComponent', () => {
  let component: MainCompositionComponent;
  let fixture: ComponentFixture<MainCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCompositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
