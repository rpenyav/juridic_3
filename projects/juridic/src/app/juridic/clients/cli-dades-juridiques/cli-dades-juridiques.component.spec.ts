import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDadesJuridiquesComponent } from './cli-dades-juridiques.component';

describe('CliDadesJuridiquesComponent', () => {
  let component: CliDadesJuridiquesComponent;
  let fixture: ComponentFixture<CliDadesJuridiquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliDadesJuridiquesComponent]
    });
    fixture = TestBed.createComponent(CliDadesJuridiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
