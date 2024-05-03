import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliComunicacionsComponent } from './cli-comunicacions.component';

describe('CliComunicacionsComponent', () => {
  let component: CliComunicacionsComponent;
  let fixture: ComponentFixture<CliComunicacionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliComunicacionsComponent]
    });
    fixture = TestBed.createComponent(CliComunicacionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
