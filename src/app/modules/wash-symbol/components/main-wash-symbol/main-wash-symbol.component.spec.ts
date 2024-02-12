import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWashSymbolComponent } from './main-wash-symbol.component';

describe('MainWashSymbolComponent', () => {
  let component: MainWashSymbolComponent;
  let fixture: ComponentFixture<MainWashSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainWashSymbolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainWashSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
