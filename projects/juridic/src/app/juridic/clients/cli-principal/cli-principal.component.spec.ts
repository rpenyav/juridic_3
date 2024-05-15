import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliPrincipalComponent } from './cli-principal.component';

describe('CliPrincipalComponent', () => {
  let component: CliPrincipalComponent;
  let fixture: ComponentFixture<CliPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliPrincipalComponent]
    });
    fixture = TestBed.createComponent(CliPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
