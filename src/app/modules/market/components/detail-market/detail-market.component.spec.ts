import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMarketComponent } from './detail-market.component';

describe('DetailMarketComponent', () => {
  let component: DetailMarketComponent;
  let fixture: ComponentFixture<DetailMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
