import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenericGroupListComponent } from './user-generic-group-list.component';

describe('UserGenericGroupListComponent', () => {
  let component: UserGenericGroupListComponent;
  let fixture: ComponentFixture<UserGenericGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGenericGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGenericGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
