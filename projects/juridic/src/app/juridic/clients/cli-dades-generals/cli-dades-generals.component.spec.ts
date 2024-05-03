import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDadesGeneralsComponent } from './cli-dades-generals.component';

describe('CliDadesGeneralsComponent', () => {
  let component: CliDadesGeneralsComponent;
  let fixture: ComponentFixture<CliDadesGeneralsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliDadesGeneralsComponent]
    });
    fixture = TestBed.createComponent(CliDadesGeneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
