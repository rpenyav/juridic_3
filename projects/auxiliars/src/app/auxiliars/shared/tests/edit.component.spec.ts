import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from '../edit/edit.component';
import { TestingModule } from 'src/app/testing/testing/testing.module';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(async () => {
    mockLocalStorage = {};

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return mockLocalStorage[key] || null;
      }
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): void => {
        mockLocalStorage[key] = value;
      }
    );

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle edit mode', () => {
    expect(component.isEditing).toBeFalse();
    component.toggleEdit();
    expect(component.isEditing).toBeTrue();
    component.toggleEdit();
    expect(component.isEditing).toBeFalse();
  });

  it('should emit valueChange on change', () => {
    const spy = spyOn(component.valueChange, 'emit');
    component.onChange('new value');
    expect(spy).toHaveBeenCalledWith('new value');
  });

  it('should emit save with current value', () => {
    const spy = spyOn(component.save, 'emit');
    component.value = 'test value';
    component.saveEdit();
    expect(spy).toHaveBeenCalledWith('test value');
    expect(component.isEditing).toBeFalse();
  });

  it('should update localStorage on change', () => {
    component.field = 'testField';
    component.onChange('test value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'editData',
      jasmine.any(String)
    );
    const storedData = JSON.parse(mockLocalStorage['editData']);
    expect(storedData['testField']).toEqual('test value');
  });
});
