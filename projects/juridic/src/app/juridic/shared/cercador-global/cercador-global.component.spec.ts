import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercadorGlobalComponent } from './cercador-global.component';

describe('CercadorGlobalComponent', () => {
  let component: CercadorGlobalComponent;
  let fixture: ComponentFixture<CercadorGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CercadorGlobalComponent]
    });
    fixture = TestBed.createComponent(CercadorGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
