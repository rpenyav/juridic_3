import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { ClientsComponent } from './clients.component';
import Swal from 'sweetalert2';

@Component({
  template: '<p>Dummy Component</p>',
})
class DummyComponent {}

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'some-path', component: DummyComponent },
          { path: 'juridic/clients/cli-123', component: DummyComponent },
        ]),
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: { url: of(['test', 'route']) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle URL changes and update buscador state', fakeAsync(() => {
    component.seleccionarBuscador();
    flush();
    expect(router.navigate).toHaveBeenCalledWith(['/juridic/clients/buscador']);
  }));

  it('should navigate to new tab when adding a tab', () => {
    let id = '123';
    component.agregarTab(id);
    expect(router.navigate).toHaveBeenCalledWith([
      component.tabsRoutePrefix,
      `${component.tabIdPrefix}-${id}`,
    ]);
    expect(component.thisTabs.length).toBeGreaterThan(0);
  });

  describe('cerrarTab function', () => {
    beforeEach(() => {
      // Configuración del espía de Swal.fire
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false,
        })
      );
    });

    // it('should remove the specified tab and update the tabs array', async () => {
    //   const initialLength = component.thisTabs.length;
    //   const tabIdToRemove = 'tab1';

    //   // Llamada a la función cerrarTab y esperar a que se resuelva la promesa
    //   await component.cerrarTab(tabIdToRemove);

    //   // Verificar que la longitud del arreglo de tabs sea menor
    //   expect(component.thisTabs.length).toBeLessThan(initialLength);

    //   // Verificar que la pestaña haya sido eliminada del arreglo
    //   expect(
    //     component.thisTabs.find((tab) => tab.id === tabIdToRemove)
    //   ).toBeUndefined();
    // });
  });
});
