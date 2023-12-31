import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUserGenericGroupComponent } from './data-user-generic-group.component';

describe('DataUserGenericGroupComponent', () => {
  let component: DataUserGenericGroupComponent;
  let fixture: ComponentFixture<DataUserGenericGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUserGenericGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataUserGenericGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
