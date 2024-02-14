import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCurrencyComponent } from './detail-currency.component';

describe('DetailCurrencyComponent', () => {
  let component: DetailCurrencyComponent;
  let fixture: ComponentFixture<DetailCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCurrencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
