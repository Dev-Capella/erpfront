import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCronJobComponent } from './new-cron-job.component';

describe('NewCronJobComponent', () => {
  let component: NewCronJobComponent;
  let fixture: ComponentFixture<NewCronJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCronJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCronJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
