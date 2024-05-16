import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestingModule } from 'src/app/testing/testing/testing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyRelationTypesDetailComponent } from '../company_relation_types-detail.component';
import { GeneralService } from '../../services/general.service';
import { of } from 'rxjs';
import { AddressType } from '../../../interfaces/address-type';

describe('CompanyRelationTypesDetailComponent', () => {
  let component: CompanyRelationTypesDetailComponent;
  let fixture: ComponentFixture<CompanyRelationTypesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CompanyRelationTypesDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRelationTypesDetailComponent);
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
    const mockResponse: AddressType = {
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
