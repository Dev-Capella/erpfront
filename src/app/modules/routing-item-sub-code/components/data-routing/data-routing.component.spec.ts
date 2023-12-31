import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRoutingComponent } from './data-routing.component';

describe('DataQualityComponent', () => {
  let component: DataRoutingComponent;
  let fixture: ComponentFixture<DataRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataRoutingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
