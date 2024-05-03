import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDadesBancariesComponent } from './cli-dades-bancaries.component';

describe('CliDadesBancariesComponent', () => {
  let component: CliDadesBancariesComponent;
  let fixture: ComponentFixture<CliDadesBancariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliDadesBancariesComponent]
    });
    fixture = TestBed.createComponent(CliDadesBancariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
