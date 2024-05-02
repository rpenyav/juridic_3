import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliRelacioClientsComponent } from './cli-relacio-clients.component';

describe('CliRelacioClientsComponent', () => {
  let component: CliRelacioClientsComponent;
  let fixture: ComponentFixture<CliRelacioClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliRelacioClientsComponent]
    });
    fixture = TestBed.createComponent(CliRelacioClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
