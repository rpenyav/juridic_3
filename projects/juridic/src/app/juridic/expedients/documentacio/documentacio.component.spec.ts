import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacioComponent } from './documentacio.component';

describe('DocumentacioComponent', () => {
  let component: DocumentacioComponent;
  let fixture: ComponentFixture<DocumentacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentacioComponent]
    });
    fixture = TestBed.createComponent(DocumentacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
