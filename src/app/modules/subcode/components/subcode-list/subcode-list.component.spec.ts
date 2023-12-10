import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcodeListComponent } from './subcode-list.component';

describe('SubcodeListComponent', () => {
  let component: SubcodeListComponent;
  let fixture: ComponentFixture<SubcodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcodeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
