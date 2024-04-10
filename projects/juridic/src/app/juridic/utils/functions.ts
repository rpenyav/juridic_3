import { ChangeDetectorRef, Type, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

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

export function verifyAndRender(
  route: ActivatedRoute,
  dynamicContentRef: ViewContainerRef,
  componenteARenderizar: Type<any>
) {
  route.url.subscribe((urlSegments) => {
    const isBuscadorRoute = urlSegments.some(
      (segment) => segment.path === 'buscador'
    );
    if (isBuscadorRoute && dynamicContentRef) {
      renderComponent(dynamicContentRef, componenteARenderizar);
    }
  });
}

function renderComponent(
  dynamicContentRef: ViewContainerRef,
  component: Type<any>
) {
  if (dynamicContentRef) {
    dynamicContentRef.clear();
    dynamicContentRef.createComponent(component);
  }
}
