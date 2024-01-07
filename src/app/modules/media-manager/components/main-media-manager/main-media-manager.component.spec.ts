import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMediaManagerComponent } from './main-media-manager.component';

describe('MainMediaManagerComponent', () => {
  let component: MainMediaManagerComponent;
  let fixture: ComponentFixture<MainMediaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMediaManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainMediaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
