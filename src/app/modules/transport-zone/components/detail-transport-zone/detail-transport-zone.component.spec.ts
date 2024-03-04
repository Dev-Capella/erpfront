import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransportZoneComponent } from './detail-transport-zone.component';

describe('DetailTransportZoneComponent', () => {
  let component: DetailTransportZoneComponent;
  let fixture: ComponentFixture<DetailTransportZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTransportZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTransportZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
