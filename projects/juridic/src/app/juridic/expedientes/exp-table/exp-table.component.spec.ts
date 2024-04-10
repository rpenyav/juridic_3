import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpTableComponent } from './exp-table.component';

describe('ExpTableComponent', () => {
  let component: ExpTableComponent;
  let fixture: ComponentFixture<ExpTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpTableComponent]
    });
    fixture = TestBed.createComponent(ExpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
