import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPermissionComponent } from './new-permission.component';

describe('NewPermissionComponent', () => {
  let component: NewPermissionComponent;
  let fixture: ComponentFixture<NewPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
