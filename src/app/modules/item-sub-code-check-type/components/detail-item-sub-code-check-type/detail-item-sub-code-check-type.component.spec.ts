import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemSubCodeCheckTypeComponent } from './detail-item-sub-code-check-type.component';

describe('DetailItemSubCodeCheckTypeComponent', () => {
  let component: DetailItemSubCodeCheckTypeComponent;
  let fixture: ComponentFixture<DetailItemSubCodeCheckTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailItemSubCodeCheckTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailItemSubCodeCheckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
