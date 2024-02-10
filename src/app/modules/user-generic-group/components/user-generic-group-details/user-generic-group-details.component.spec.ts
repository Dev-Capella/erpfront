import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenericGroupDetailsComponent } from './user-generic-group-details.component';

describe('UserGenericGroupDetailsComponent', () => {
  let component: UserGenericGroupDetailsComponent;
  let fixture: ComponentFixture<UserGenericGroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGenericGroupDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGenericGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
