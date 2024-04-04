import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosRelacionatsComponent } from './casos-relacionats.component';

describe('CasosRelacionatsComponent', () => {
  let component: CasosRelacionatsComponent;
  let fixture: ComponentFixture<CasosRelacionatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CasosRelacionatsComponent]
    });
    fixture = TestBed.createComponent(CasosRelacionatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
