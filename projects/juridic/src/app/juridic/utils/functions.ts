import { ChangeDetectorRef, Type, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { ExpedienteModel } from '../interfaces/expedientes';
import { ClienteModel } from '../interfaces/clientes';

interface Tab {
  id: string;
  isSelected: boolean;
}

export function seleccionarBuscador(
  buscadorRoute: string,
  tabs: Tab[],
  actualizarSessionStorage: () => void,
  cdr: ChangeDetectorRef,
  router: Router
) {
  tabs.forEach((tab) => (tab.isSelected = false));
  actualizarSessionStorage();
  cdr.detectChanges();
  router.navigate([buscadorRoute]);
}

export function cargarTabsDesdeSessionStorage(
  sessionStorageKeyTabs: string,
  setTabs: (tabs: any[]) => void // Un setter para actualizar las pestañas en el componente
) {
  const storedTabs = sessionStorage.getItem(sessionStorageKeyTabs);
  if (storedTabs) {
    const tabs = JSON.parse(storedTabs);
    setTabs(tabs); // Actualiza las pestañas en el componente
  }
}

export function cerrarTab(
  tabId: string,
  tabs: any[], // La lista actual de pestañas
  setTabs: (newTabs: any[]) => void, // Función para actualizar la lista de pestañas en el componente
  navigate: (route: string) => void, // Función para manejar la navegación
  actualizarSessionStorage: () => void, // Función para actualizar sessionStorage con las pestañas actuales
  seleccionarBuscador: () => void, // Función para seleccionar el buscador
  tabsRoutePrefix: string // Prefijo de la ruta para las pestañas
) {
  Swal.fire({
    title: '¿Estás seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, ciérralo!',
    cancelButtonText: 'No, mantener',
  }).then((result) => {
    if (result.isConfirmed) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId);
      setTabs(newTabs);

      if (
        tabId === newTabs.find((tab) => tab.isSelected)?.id ||
        !newTabs.some((tab) => tab.isSelected)
      ) {
        if (newTabs.length > 0) {
          newTabs[0].isSelected = true;
          navigate(`${tabsRoutePrefix}/${newTabs[0].id}`);
        } else {
          seleccionarBuscador();
        }
      }

      actualizarSessionStorage();
    }
  });
}

export function actualizarSessionStorage(key: string, data: any) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function seleccionarTab({
  tabId,
  setBuscadorSeleccionado,
  tabs,
  actualizarSessionStorage,
  navigate,
  buscadorRoute,
  sessionStorageKeyTabs,
}) {
  setBuscadorSeleccionado(false);
  const newTabs = tabs.map((tab) => ({
    ...tab,
    isSelected: tab.id === tabId,
  }));

  actualizarSessionStorage(sessionStorageKeyTabs, newTabs);
  navigate(`${buscadorRoute}/${tabId}`);
}

// export function verifyAndRender(
//   route: ActivatedRoute,
//   dynamicContentRef: ViewContainerRef,
//   componenteARenderizar: Type<any>,
//   params?: { [key: string]: any }
// ) {
//   route.url.subscribe((urlSegments) => {
//     const isBuscadorRoute = urlSegments.some(
//       (segment) => segment.path === 'buscador'
//     );
//     if (isBuscadorRoute && dynamicContentRef) {
//       renderComponent(dynamicContentRef, componenteARenderizar, params);
//     }
//   });
// }

// function renderComponent(
//   dynamicContentRef: ViewContainerRef,
//   component: Type<any>,
//   params?: { [key: string]: any }
// ) {
//   dynamicContentRef.clear();
//   const componentRef = dynamicContentRef.createComponent(component);
//   if (params) {
//     Object.assign(componentRef.instance, params);
//   }
// }

export type Column<T> = {
  field: keyof T;
  title: string;
};

/**
 * DEFINIMOS EL MODELO Y LAS COLUMNAS DE LA TABLA SEGÚN el parámetro "type"
 * field: nombre del campo tal y como figura en el modelo y tal y como llega desde el endpoint
 * title: label del campo traducida
 * @param type
 * @returns
 */
export function setupColumns<T extends ExpedienteModel | ClienteModel>(
  type: string
): Column<T>[] {
  switch (type) {
    case 'expedientes':
      return [
        { field: 'Referència', title: 'Referència' },
        { field: 'Num. Expedient', title: 'Num. Expedient' },
        { field: 'Client', title: 'Client' },
        { field: 'Contrato', title: 'Contrato' },
        { field: 'Tutor', title: 'Tutor' },
        { field: 'Estat', title: 'Estat' },
        { field: 'Num. Autos', title: 'Num. Autos' },
      ] as Column<T>[];
    case 'clientes':
      return [
        { field: 'Referencia', title: 'Referència' },
        { field: 'NumExpedient', title: 'Num. Expedient' },
        { field: 'Client', title: 'Client' },
        { field: 'NumAutos', title: 'Num. Autos' },
      ] as Column<T>[];
    default:
      return [];
  }
}
