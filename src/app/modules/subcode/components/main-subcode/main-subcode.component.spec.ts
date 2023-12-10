import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSubcodeComponent } from './main-subcode.component';

describe('MainSubcodeComponent', () => {
  let component: MainSubcodeComponent;
  let fixture: ComponentFixture<MainSubcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSubcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSubcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
