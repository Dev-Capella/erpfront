import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWashSymbolComponent } from './detail-wash-symbol.component';

describe('DetailWashSymbolComponent', () => {
  let component: DetailWashSymbolComponent;
  let fixture: ComponentFixture<DetailWashSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailWashSymbolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailWashSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
