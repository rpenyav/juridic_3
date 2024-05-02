import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliHistoricAbonamentsComponent } from './cli-historic-abonaments.component';

describe('CliHistoricAbonamentsComponent', () => {
  let component: CliHistoricAbonamentsComponent;
  let fixture: ComponentFixture<CliHistoricAbonamentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliHistoricAbonamentsComponent]
    });
    fixture = TestBed.createComponent(CliHistoricAbonamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
