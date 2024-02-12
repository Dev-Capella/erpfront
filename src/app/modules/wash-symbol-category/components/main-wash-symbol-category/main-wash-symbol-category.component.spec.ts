import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWashSymbolCategoryComponent } from './main-wash-symbol-category.component';

describe('MainWashSymbolCategoryComponent', () => {
  let component: MainWashSymbolCategoryComponent;
  let fixture: ComponentFixture<MainWashSymbolCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainWashSymbolCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainWashSymbolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
