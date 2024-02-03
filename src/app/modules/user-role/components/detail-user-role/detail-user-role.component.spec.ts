import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserRoleComponent } from './detail-user-role.component';

describe('DetailUserRoleComponent', () => {
  let component: DetailUserRoleComponent;
  let fixture: ComponentFixture<DetailUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUserRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
