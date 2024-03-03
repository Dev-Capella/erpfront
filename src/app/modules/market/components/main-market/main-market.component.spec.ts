import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMarketComponent } from './main-market.component';

describe('MainMarketComponent', () => {
  let component: MainMarketComponent;
  let fixture: ComponentFixture<MainMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
