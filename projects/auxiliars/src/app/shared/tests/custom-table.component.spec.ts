import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTableComponent } from '../custom-table/custom-table.component';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<any>;
  let fixture: ComponentFixture<CustomTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit detailViewed event on viewDetails', () => {
    const spy = spyOn(component.detailViewed, 'emit');
    const mockId = '123';
    component.viewDetails(mockId);
    expect(spy).toHaveBeenCalledWith(mockId);
  });

  it('should emit itemDeleted event on delete', () => {
    const spy = spyOn(component.itemDeleted, 'emit');
    const mockItem = { id: '123', name: 'Test Item' };
    component.delete(mockItem);
    expect(spy).toHaveBeenCalledWith(mockItem);
  });

  it('should get property value from a row', () => {
    const row = { id: '123', name: 'Test Name' };
    const value = component.getPropertyValue(row, 'name');
    expect(value).toBe('Test Name');
  });

  it('should emit sorted event on sort', () => {
    const spy = spyOn(component.sorted, 'emit');
    const column = {
      key: 'name',
      sortable: true,
      direction: 'ASC' as 'ASC' | 'DESC',
    };
    component.sort(column);
    expect(spy).toHaveBeenCalledWith({ key: 'name', direction: 'DESC' });
    expect(column.direction).toBe('DESC');
  });

  it('should not sort if column is not sortable', () => {
    const spy = spyOn(component.sorted, 'emit');

    const column = {
      key: 'name',
      sortable: false,
      direction: 'ASC' as 'ASC' | 'DESC',
    };
    component.sort(column);
    expect(spy).not.toHaveBeenCalled();
  });
});
