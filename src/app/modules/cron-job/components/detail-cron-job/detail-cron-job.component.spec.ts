import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCronJobComponent } from './detail-cron-job.component';

describe('DetailCronJobComponent', () => {
  let component: DetailCronJobComponent;
  let fixture: ComponentFixture<DetailCronJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCronJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCronJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
