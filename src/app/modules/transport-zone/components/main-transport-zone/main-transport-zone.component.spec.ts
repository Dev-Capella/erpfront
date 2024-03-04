import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTransportZoneComponent } from './main-transport-zone.component';

describe('MainTransportZoneComponent', () => {
  let component: MainTransportZoneComponent;
  let fixture: ComponentFixture<MainTransportZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTransportZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTransportZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
