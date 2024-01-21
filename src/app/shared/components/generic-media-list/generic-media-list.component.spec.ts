import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMediaListComponent } from './generic-media-list.component';

describe('GenericMediaListComponent', () => {
  let component: GenericMediaListComponent;
  let fixture: ComponentFixture<GenericMediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericMediaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericMediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
