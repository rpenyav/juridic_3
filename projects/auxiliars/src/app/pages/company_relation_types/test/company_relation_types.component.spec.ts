import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestingModule } from 'src/app/testing/testing/testing.module';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CompanyRelationTypesComponent } from '../company_relation_types.component';
import { of } from 'rxjs';
import { AddressType } from 'src/app/interfaces/address-type';

describe('CompanyRelationTypesComponent', () => {
  let component: CompanyRelationTypesComponent;
  let fixture: ComponentFixture<CompanyRelationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CompanyRelationTypesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRelationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load data', fakeAsync(() => {
    const spy = spyOn(
      component.generalService,
      'getRegisterTypes'
    ).and.returnValue(
      of({
        list: [],
        totalPages: 0,
        totalElements: 0,
      })
    );
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should navigate to the detail page on viewDetails', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const mockId = 1;
    component.viewDetails(mockId);
    expect(routerSpy).toHaveBeenCalledWith(['/ca/_/addresstype', mockId]);
  });

  it('should call createRegisterType on create', fakeAsync(() => {
    const spy = spyOn(
      component.generalService,
      'createRegisterType'
    ).and.returnValue(of({}));
    const mockData: AddressType = {
      id: 1,
      literalDescriptionText: 'Test',
      description: 'Test Description',
    };
    component.create(mockData);
    tick();
    expect(spy).toHaveBeenCalledWith(component.ENDPOINT, mockData);
  }));

  it('should call deleteRegisterType on delete', fakeAsync(() => {
    const deleteSpy = spyOn(
      component.generalService,
      'deleteRegisterType'
    ).and.returnValue(of({}));
    const mockId = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    component.delete({ id: mockId } as AddressType);
    tick();
    expect(deleteSpy).toHaveBeenCalledWith(component.ENDPOINT, mockId);
  }));
});
