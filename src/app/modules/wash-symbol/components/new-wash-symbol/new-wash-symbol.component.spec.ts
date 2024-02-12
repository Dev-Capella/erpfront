import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWashSymbolComponent } from './new-wash-symbol.component';

describe('NewWashSymbolComponent', () => {
  let component: NewWashSymbolComponent;
  let fixture: ComponentFixture<NewWashSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWashSymbolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewWashSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
