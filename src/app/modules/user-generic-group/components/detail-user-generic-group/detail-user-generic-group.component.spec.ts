import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserGenericGroupComponent } from './detail-user-generic-group.component';

describe('DetailUserGenericGroupComponent', () => {
  let component: DetailUserGenericGroupComponent;
  let fixture: ComponentFixture<DetailUserGenericGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUserGenericGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailUserGenericGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
