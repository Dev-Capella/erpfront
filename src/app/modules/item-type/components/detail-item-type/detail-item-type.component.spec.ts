import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemTypeComponent } from './detail-item-type.component';

describe('DetailItemTypeComponent', () => {
  let component: DetailItemTypeComponent;
  let fixture: ComponentFixture<DetailItemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailItemTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailItemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
