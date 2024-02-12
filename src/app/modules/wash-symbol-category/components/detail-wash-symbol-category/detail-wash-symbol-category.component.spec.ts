import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWashSymbolCategoryComponent } from './detail-wash-symbol-category.component';

describe('DetailWashSymbolCategoryComponent', () => {
  let component: DetailWashSymbolCategoryComponent;
  let fixture: ComponentFixture<DetailWashSymbolCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailWashSymbolCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailWashSymbolCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
