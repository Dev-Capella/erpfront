import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingSbcComponent } from './routing-sbc.component';

describe('RoutingSbcComponent', () => {
  let component: RoutingSbcComponent;
  let fixture: ComponentFixture<RoutingSbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingSbcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutingSbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
