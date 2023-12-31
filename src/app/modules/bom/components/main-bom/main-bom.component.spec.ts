import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBomComponent } from './main-bom.component';

describe('MainBomComponent', () => {
  let component: MainBomComponent;
  let fixture: ComponentFixture<MainBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
