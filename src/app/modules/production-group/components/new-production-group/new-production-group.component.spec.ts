import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductionGroupComponent } from './new-production-group.component';

describe('NewProductionGroupComponent', () => {
  let component: NewProductionGroupComponent;
  let fixture: ComponentFixture<NewProductionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductionGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewProductionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
