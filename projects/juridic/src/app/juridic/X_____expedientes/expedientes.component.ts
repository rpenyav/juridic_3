import { v4 as uuidv4 } from 'uuid';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface ExpedienteTab {
  id: string;
  title: string;
  content: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css'],
})
export class ExpedientesComponent implements OnInit {
  mostrarBuscador = false;
  buscadorSeleccionado = false;

  expedienteTabs: ExpedienteTab[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Verificar si la pestaña "buscador" debe mostrarse al iniciar
    const expedientSearchOpen = sessionStorage.getItem('expedient-search');
    if (expedientSearchOpen) {
      this.mostrarBuscador = true;
      // Opcionalmente, restaurar el contenido de la pestaña si se almacena en sessionStorage
    }
    this.cargarTabsDesdeSessionStorage();
  }

  abrirBuscador() {
    // Verifica si el buscador ya está abierto para evitar acciones innecesarias
    if (!this.mostrarBuscador || !this.buscadorSeleccionado) {
      this.mostrarBuscador = true;
      this.buscadorSeleccionado = true;
      // Asegúrate de que todas las otras pestañas estén deseleccionadas
      this.expedienteTabs.forEach((tab) => (tab.isSelected = false));
      sessionStorage.setItem('expedient-search', 'true');
      this.actualizarSessionStorage();

      this.router.navigate(['/expedientes/buscador']);
    }
  }

  cerrarBuscador() {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ciérralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mostrarBuscador = false;
        sessionStorage.removeItem('expedient-search');

        this.router.navigateByUrl('/expedientes');
      }
    });
  }

  seleccionarBuscador() {
    this.buscadorSeleccionado = true;
    this.expedienteTabs.forEach((tab) => (tab.isSelected = false));
    this.actualizarSessionStorage();
    this.cdr.detectChanges();
  }

  //---------------------------------------------------------------------------
  //----
  //---- métodos tabs expedientes
  //----
  //---------------------------------------------------------------------------

  cargarTabsDesdeSessionStorage() {
    const storedTabs = sessionStorage.getItem('exp-tabs');
    if (storedTabs) {
      this.expedienteTabs = JSON.parse(storedTabs);
      // Restaurar la pestaña seleccionada en la URL si es necesario
    }
  }

  agregarTab() {
    const newTab: ExpedienteTab = {
      id: `exp-${uuidv4()}`, // Genera un ID único
      title: 'Nuevo Expediente',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      isSelected: true,
    };

    // Marcar todas las otras pestañas como no seleccionadas
    this.expedienteTabs.forEach((tab) => (tab.isSelected = false));

    this.expedienteTabs.push(newTab);
    this.actualizarSessionStorage();

    this.router.navigate(['/expedientes', newTab.id]);
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
        this.expedienteTabs = this.expedienteTabs.filter(
          (tab) => tab.id !== tabId
        );
        this.actualizarSessionStorage();
        // Actualizar la URL si es necesario
      }
    });
  }

  actualizarSessionStorage() {
    sessionStorage.setItem('exp-tabs', JSON.stringify(this.expedienteTabs));
  }

  seleccionarTab(tabId: string) {
    this.buscadorSeleccionado = false;
    this.expedienteTabs.forEach((tab) => {
      tab.isSelected = tab.id === tabId;
    });
    this.actualizarSessionStorage();
    this.router.navigate(['/expedientes', tabId]);
  }
}
