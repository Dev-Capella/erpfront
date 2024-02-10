import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemSubCodeCheckTypeComponent } from './main-item-sub-code-check-type.component';

describe('MainItemSubCodeCheckTypeComponent', () => {
  let component: MainItemSubCodeCheckTypeComponent;
  let fixture: ComponentFixture<MainItemSubCodeCheckTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainItemSubCodeCheckTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainItemSubCodeCheckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
