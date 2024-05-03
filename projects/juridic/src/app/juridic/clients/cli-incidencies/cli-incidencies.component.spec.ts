import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliIncidenciesComponent } from './cli-incidencies.component';

describe('CliIncidenciesComponent', () => {
  let component: CliIncidenciesComponent;
  let fixture: ComponentFixture<CliIncidenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliIncidenciesComponent]
    });
    fixture = TestBed.createComponent(CliIncidenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
