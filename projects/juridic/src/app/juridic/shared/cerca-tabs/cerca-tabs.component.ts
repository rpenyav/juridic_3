import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-cerca-tabs',
  templateUrl: './cerca-tabs.component.html',
  styleUrls: ['./cerca-tabs.component.scss'],
})
export class CercaTabsComponent {
  private readonly cercadorTabId = 'cercadorTab';

  isCercadorTabOpen: boolean = false;

  constructor(private tabsService: TabsService, private router: Router) {}

  openCercadorTab() {
    if (!this.isCercadorTabOpen) {
      this.tabsService.openTab({
        id: this.cercadorTabId,
        title: 'Cercador',
        content: 'Contenido del Cercador', // Ajusta el contenido según necesites.
      });
      this.isCercadorTabOpen = true;
      // Navegar a la pestaña del Cercador.
      this.router.navigate(['/cercador']);
    }
  }

  // Método para cerrar la pestaña de búsqueda.
  closeCercadorTab() {
    if (this.isCercadorTabOpen) {
      this.tabsService.closeTab(this.cercadorTabId);
      this.isCercadorTabOpen = false;
      this.router.navigate(['/']);
    }
  }
}
