import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientsComponent } from './expedients.component';

describe('ExpedientsComponent', () => {
  let component: ExpedientsComponent;
  let fixture: ComponentFixture<ExpedientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpedientsComponent]
    });
    fixture = TestBed.createComponent(ExpedientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
