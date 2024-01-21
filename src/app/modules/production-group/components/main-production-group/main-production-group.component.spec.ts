import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductionGroupComponent } from './main-production-group.component';

describe('MainProductionGroupComponent', () => {
  let component: MainProductionGroupComponent;
  let fixture: ComponentFixture<MainProductionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainProductionGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainProductionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
