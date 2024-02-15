import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCronJobComponent } from './main-cron-job.component';

describe('MainCronJobComponent', () => {
  let component: MainCronJobComponent;
  let fixture: ComponentFixture<MainCronJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCronJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCronJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
