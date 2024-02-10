import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserAuditComponent } from './main-user-audit.component';

describe('MainUserAuditComponent', () => {
  let component: MainUserAuditComponent;
  let fixture: ComponentFixture<MainUserAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainUserAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainUserAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
