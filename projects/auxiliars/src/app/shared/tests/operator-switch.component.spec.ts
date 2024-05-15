import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperatorSwitchComponent } from '../operator-switch/operator-switch.component';
import { TestingModule } from 'src/app/testing/testing/testing.module';

describe('OperatorSwitchComponent', () => {
  let component: OperatorSwitchComponent;
  let fixture: ComponentFixture<OperatorSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorSwitchComponent],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorSwitchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.operators = [
      { value: 'add', label: 'Addition', icon: 'add_icon' },
    ];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit the first operator on init if operators are provided', () => {
    const mockOperators = [
      { value: 'add', label: 'Addition' },
      { value: 'subtract', label: 'Subtraction' },
    ];
    component.operators = mockOperators;
    const spy = spyOn(component.operatorChanged, 'emit');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(mockOperators[0].value);
  });

  it('should switch to the next operator and emit its value', () => {
    // Configura los operadores antes de instalar el espía
    component.operators = [
      { value: 'add', label: 'Addition' },
      { value: 'subtract', label: 'Subtraction' },
    ];

    // Ahora que los operadores están configurados, configura el espía sobre `operatorChanged.emit`
    const spy = spyOn(component.operatorChanged, 'emit');

    // Llama a switchOperator para cambiar al siguiente operador
    component.switchOperator();

    // Espera que el segundo operador ('subtract') sea emitido
    expect(spy).toHaveBeenCalledWith('subtract');

    // Llama nuevamente para volver al primer operador
    component.switchOperator();

    // Ahora espera que el primer operador ('add') sea emitido nuevamente
    expect(spy).toHaveBeenCalledWith('add');
  });

  it('should do nothing when there are no operators', () => {
    const spy = spyOn(component.operatorChanged, 'emit');

    component.operators = [];
    component.ngOnInit();

    component.switchOperator();

    expect(spy).not.toHaveBeenCalled();
  });
});
