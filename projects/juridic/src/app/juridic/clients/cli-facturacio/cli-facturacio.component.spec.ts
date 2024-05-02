import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliFacturacioComponent } from './cli-facturacio.component';

describe('CliFacturacioComponent', () => {
  let component: CliFacturacioComponent;
  let fixture: ComponentFixture<CliFacturacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliFacturacioComponent]
    });
    fixture = TestBed.createComponent(CliFacturacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
