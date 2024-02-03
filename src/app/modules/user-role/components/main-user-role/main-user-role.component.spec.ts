import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserRoleComponent } from './main-user-role.component';

describe('MainUserRoleComponent', () => {
  let component: MainUserRoleComponent;
  let fixture: ComponentFixture<MainUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainUserRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
