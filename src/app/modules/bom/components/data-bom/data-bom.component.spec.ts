import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBomComponent } from './data-bom.component';

describe('DataQualityComponent', () => {
  let component: DataBomComponent;
  let fixture: ComponentFixture<DataBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
