import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemSubCodeCheckTypeComponent } from './new-item-sub-code-check-type.component';

describe('NewItemSubCodeCheckTypeComponent', () => {
  let component: NewItemSubCodeCheckTypeComponent;
  let fixture: ComponentFixture<NewItemSubCodeCheckTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewItemSubCodeCheckTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewItemSubCodeCheckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
