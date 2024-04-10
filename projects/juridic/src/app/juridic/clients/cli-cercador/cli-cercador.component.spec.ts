import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpCercadorComponent } from './exp-cercador.component';

describe('ExpCercadorComponent', () => {
  let component: ExpCercadorComponent;
  let fixture: ComponentFixture<ExpCercadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpCercadorComponent]
    });
    fixture = TestBed.createComponent(ExpCercadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
