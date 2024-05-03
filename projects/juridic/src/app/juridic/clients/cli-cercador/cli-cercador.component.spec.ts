import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CliCercadorComponent } from './cli-cercador.component';
import { GeneralService } from '../../services/general.service';
import { I18nService } from 'shared-lib';
import { of, throwError } from 'rxjs';
import { ClientModel } from '../../interfaces/clients';

describe('CliCercadorComponent', () => {
  let component: CliCercadorComponent;
  let fixture: ComponentFixture<CliCercadorComponent>;
  let generalServiceMock: any;
  let i18nServiceMock: any;

  beforeEach(async () => {
    generalServiceMock = jasmine.createSpyObj('GeneralService', [
      'getPaginatedData',
    ]);
    i18nServiceMock = {
      translations$: of({ 'LABEL.numautos': 'Número de Autos' }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CliCercadorComponent],
      providers: [
        { provide: GeneralService, useValue: generalServiceMock },
        { provide: I18nService, useValue: i18nServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CliCercadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    const inputElements = formElement.queryAll(By.css('input'));
    expect(inputElements.length).toEqual(6);
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('should call the data service on form submit with valid data', () => {
    generalServiceMock.getPaginatedData.and.returnValue(
      of({ list: [], totalElements: 0 })
    );
    component.searchForm.controls['referencia'].setValue('12345');
    component.onSubmit();
    expect(generalServiceMock.getPaginatedData).toHaveBeenCalledWith(
      component.endpoint,
      component.pageNumber,
      component.pageSize,
      jasmine.any(Object)
    );
  });

  it('should handle errors during data fetching', () => {
    generalServiceMock.getPaginatedData.and.returnValue(
      throwError(() => new Error('Error fetching data'))
    );
    component.onSubmit();
    expect(component.errorMessage).toContain('Error en la búsqueda');
  });

  it('should emit event when referencia is selected', () => {
    spyOn(component.referenciaSelected, 'emit');
    const mockItem: ClientModel = {
      id: '',
      Referencia: '',
      NumExpedient: '',
      Client: '',
      NumAutos: 0,
    };
    component.handleReferenciaSelected(mockItem);
    expect(component.referenciaSelected.emit).toHaveBeenCalledWith(mockItem);
  });
});
