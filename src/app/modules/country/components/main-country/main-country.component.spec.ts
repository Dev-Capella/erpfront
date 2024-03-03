import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCountryComponent } from './main-country.component';

describe('MainCountryComponent', () => {
  let component: MainCountryComponent;
  let fixture: ComponentFixture<MainCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
