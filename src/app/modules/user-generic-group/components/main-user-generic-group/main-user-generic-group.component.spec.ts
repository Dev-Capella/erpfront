import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserGenericGroupComponent } from './main-user-generic-group.component';

describe('MainUserGenericGroupComponent', () => {
  let component: MainUserGenericGroupComponent;
  let fixture: ComponentFixture<MainUserGenericGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainUserGenericGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainUserGenericGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
