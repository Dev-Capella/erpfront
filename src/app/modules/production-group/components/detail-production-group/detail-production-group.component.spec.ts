import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductionGroupComponent } from './detail-production-group.component';

describe('DetailProductionGroupComponent', () => {
  let component: DetailProductionGroupComponent;
  let fixture: ComponentFixture<DetailProductionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProductionGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailProductionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
