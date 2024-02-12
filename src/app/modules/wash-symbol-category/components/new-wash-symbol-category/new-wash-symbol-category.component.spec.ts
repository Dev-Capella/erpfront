import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWashSymbolCategoryComponent } from './new-wash-symbol-category.component';

describe('NewWashSymbolCategoryComponent', () => {
  let component: NewWashSymbolCategoryComponent;
  let fixture: ComponentFixture<NewWashSymbolCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWashSymbolCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewWashSymbolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
