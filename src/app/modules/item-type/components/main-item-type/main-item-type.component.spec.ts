import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemTypeComponent } from './main-item-type.component';

describe('MainItemTypeComponent', () => {
  let component: MainItemTypeComponent;
  let fixture: ComponentFixture<MainItemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainItemTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainItemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
