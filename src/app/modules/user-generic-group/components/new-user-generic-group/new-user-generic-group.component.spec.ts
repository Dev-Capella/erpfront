import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserGenericGroupComponent } from './new-user-generic-group.component';

describe('NewUserGenericGroupComponent', () => {
  let component: NewUserGenericGroupComponent;
  let fixture: ComponentFixture<NewUserGenericGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserGenericGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUserGenericGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
