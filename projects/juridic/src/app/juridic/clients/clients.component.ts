import { v4 as uuidv4 } from 'uuid';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

interface ClienteTab {
  id: string;
  title: string;
  content: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  mostrarBuscador = false;
  buscadorSeleccionado = false;
  private urlSub: Subscription;
  clienteTabs: ClienteTab[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.urlSub = this.route.url.subscribe((urlSegments) => {
      const isBuscadorRoute = urlSegments.some(
        (segment) => segment.path === 'buscador'
      );
      this.mostrarBuscador = isBuscadorRoute;
      this.buscadorSeleccionado = isBuscadorRoute;
      this.cargarTabsDesdeSessionStorage();

      // Si estamos en la ruta del buscador, asegúrate de que el contenido del buscador sea visible.
      if (isBuscadorRoute) {
        // Asegura que las pestañas y el contenido del buscador estén configurados para mostrarse.
        sessionStorage.setItem('client-search', 'true'); // Opcional, dependiendo de tu lógica de visualización.
      }
    });
  }

  ngOnDestroy() {
    if (this.urlSub) {
      this.urlSub.unsubscribe();
    }
  }

  abrirBuscador() {
    // Verifica si el buscador ya está abierto para evitar acciones innecesarias
    if (!this.mostrarBuscador || !this.buscadorSeleccionado) {
      this.mostrarBuscador = true;
      this.buscadorSeleccionado = true;
      // Asegúrate de que todas las otras pestañas estén deseleccionadas
      this.clienteTabs.forEach((tab) => (tab.isSelected = false));
      sessionStorage.setItem('client-search', 'true');
      this.actualizarSessionStorage();

      this.router.navigate(['/juridic/clientes/buscador']);
    }
  }

  seleccionarBuscador() {
    // Marcar solo la pestaña del buscador como seleccionada
    this.buscadorSeleccionado = true;

    // Desmarcar todas las otras pestañas
    this.clienteTabs.forEach((tab) => (tab.isSelected = false));

    // Actualiza el estado y la UI según sea necesario
    this.actualizarSessionStorage();
    this.cdr.detectChanges();

    // Asegúrate de navegar a la ruta del buscador si aún no estás allí
    this.router.navigate(['/juridic/clientes/buscador']);
  }

  //---------------------------------------------------------------------------
  //----
  //---- métodos tabs clientes
  //----
  //---------------------------------------------------------------------------

  cargarTabsDesdeSessionStorage() {
    const storedTabs = sessionStorage.getItem('cli-tabs');
    if (storedTabs) {
      this.clienteTabs = JSON.parse(storedTabs);
      // Restaurar la pestaña seleccionada en la URL si es necesario
    }
  }

  agregarTab() {
    const newTab: ClienteTab = {
      id: `cli-${uuidv4()}`, // Genera un ID único
      title: 'Nuevo Cliente',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      isSelected: true, // Asegúrate de que la nueva pestaña esté seleccionada
    };

    // Marcar todas las otras pestañas como no seleccionadas
    this.clienteTabs.forEach((tab) => (tab.isSelected = false));

    this.clienteTabs.push(newTab);
    this.actualizarSessionStorage();
    this.router.navigate(['/juridic/clientes', newTab.id]);
  }

  cerrarTab(tabId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ciérralo!',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      if (result.isConfirmed) {
        // Filtrar la pestaña que se va a cerrar
        this.clienteTabs = this.clienteTabs.filter((tab) => tab.id !== tabId);

        // Si cerramos la pestaña que está actualmente seleccionada, seleccionamos otra o el buscador
        if (
          tabId === this.clienteTabs.find((tab) => tab.isSelected)?.id ||
          !this.clienteTabs.some((tab) => tab.isSelected)
        ) {
          if (this.clienteTabs.length > 0) {
            // Selecciona automáticamente la primera pestaña disponible
            this.clienteTabs[0].isSelected = true;
            this.router.navigate(['/juridic/clientes', this.clienteTabs[0].id]);
          } else {
            // Si no hay más pestañas, selecciona el buscador
            this.seleccionarBuscador();
          }
        }

        this.actualizarSessionStorage();
      }
    });
  }

  actualizarSessionStorage() {
    sessionStorage.setItem('cli-tabs', JSON.stringify(this.clienteTabs));
  }
  testNavigation() {
    this.router.navigate(['/clientes', 'test-id']);
  }
  seleccionarTab(tabId: string) {
    this.buscadorSeleccionado = false;
    this.clienteTabs.forEach((tab) => {
      tab.isSelected = tab.id === tabId;
    });

    this.actualizarSessionStorage();
    this.router.navigate(['/clientes', tabId]);
  }
}
