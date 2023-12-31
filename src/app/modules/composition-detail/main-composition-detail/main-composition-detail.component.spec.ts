import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompositionDetailComponent } from './main-composition-detail.component';

describe('MainCompositionDetailComponent', () => {
  let component: MainCompositionDetailComponent;
  let fixture: ComponentFixture<MainCompositionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCompositionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCompositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
