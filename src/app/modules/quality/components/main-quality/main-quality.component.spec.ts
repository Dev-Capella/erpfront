import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainQualityComponent } from './main-quality.component';

describe('MainQualityComponent', () => {
  let component: MainQualityComponent;
  let fixture: ComponentFixture<MainQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
