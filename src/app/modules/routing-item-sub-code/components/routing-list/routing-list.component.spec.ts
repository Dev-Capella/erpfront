import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingListComponent } from './routing-list.component';

describe('QualityListComponent', () => {
  let component: RoutingListComponent;
  let fixture: ComponentFixture<RoutingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
