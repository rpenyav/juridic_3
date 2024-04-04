import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetesComponent } from './carpetes.component';

describe('CarpetesComponent', () => {
  let component: CarpetesComponent;
  let fixture: ComponentFixture<CarpetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarpetesComponent]
    });
    fixture = TestBed.createComponent(CarpetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
