import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestingModule } from 'src/app/testing/testing/testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentstypesDetailComponent } from '../document_types-detail.component';
import { GeneralService } from '../../services/general.service';
import { of } from 'rxjs';
import { DocumentsType } from '../../../interfaces/documents-type';

describe('DocumentstypesDetailComponent', () => {
  let component: DocumentstypesDetailComponent;
  let fixture: ComponentFixture<DocumentstypesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [DocumentstypesDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentstypesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change language', () => {
    const newLanguage = 2; // Ejemplo: 2 para 'EN'
    component.changePostLanguage(newLanguage);
    expect(component.postLanguage).toEqual(newLanguage);
  });

  it('should load register detail', () => {
    const service = TestBed.inject(GeneralService);
    const mockResponse: DocumentsType = {
      id: 1,
      literalDescriptionText: 'Main Office',
      description: 'The main office located in the city center.',
    };
    spyOn(service, 'getRegisterTypeById').and.returnValue(of(mockResponse));
    component.id = '1';
    component.loadRegisterDetail();
    expect(service.getRegisterTypeById).toHaveBeenCalled();
    expect(component.registerDetail).toEqual(mockResponse);
  });
});
