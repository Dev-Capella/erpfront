import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransportZoneComponent } from './new-transport-zone.component';

describe('NewTransportZoneComponent', () => {
  let component: NewTransportZoneComponent;
  let fixture: ComponentFixture<NewTransportZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTransportZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTransportZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
