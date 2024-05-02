import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDocumentsComponent } from './cli-documents.component';

describe('CliDocumentsComponent', () => {
  let component: CliDocumentsComponent;
  let fixture: ComponentFixture<CliDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliDocumentsComponent]
    });
    fixture = TestBed.createComponent(CliDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
