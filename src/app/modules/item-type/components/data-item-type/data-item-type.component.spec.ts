import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemTypeComponent } from './data-item-type.component';

describe('DataItemTypeComponent', () => {
  let component: DataItemTypeComponent;
  let fixture: ComponentFixture<DataItemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataItemTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataItemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
