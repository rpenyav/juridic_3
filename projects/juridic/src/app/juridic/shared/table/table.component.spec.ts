import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { ExpedienteModel } from '../../interfaces/expedientes';
import { ClienteModel } from '../../interfaces/clients';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.type = 'expedientes';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup columns based on type "expedientes"', () => {
    expect(component.columns.length).toBeGreaterThan(0);
    expect(component.columns[0].field).toBe('Referència');
  });

  it('should emit onReferenciaClick event when handleReferenciaClick is called', () => {
    spyOn(component.onReferenciaClick, 'emit');
    const testItem = {
      Referència: '123',
      ['Num. Expedient']: '456',
      Client: 'Test Client',
      ['Num. Autos']: 3,
    } as any;
    component.handleReferenciaClick(testItem, 'Referència');
    expect(component.onReferenciaClick.emit).toHaveBeenCalledWith('123');
  });
});
