import { Component } from '@angular/core';
import { I18nService } from 'shared-lib';
import { TabsService } from '../../services/tabs.service';
import { Tab } from '../../interfaces/tabs';
import { CercadorGlobalComponent } from '../../shared/cercador-global/cercador-global.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private i18nService: I18nService,
    private tabsService: TabsService
  ) {}

  openTab() {
    const uniqueId = `tab_${new Date().getTime()}`;
    const newTab: Tab = {
      id: uniqueId,
      title: 'Pestaña Random',
      content: `Este es un contenido hardcodeado para la demostración. ID: ${uniqueId}`,
    };
    this.tabsService.openTab(newTab);
  }

  openCercadorTab() {
    const cercadorTabId = 'cercadorTab'; // ID fijo para la pestaña Cercador

    // Verificar si la pestaña Cercador ya está abierta
    const existingTab = this.tabsService.getTabById(cercadorTabId);

    if (existingTab) {
      // Si la pestaña ya existe, simplemente seleccionarla
      this.tabsService.selectTab(cercadorTabId);
    } else {
      // Si no existe, crear la pestaña Cercador y asegurarse de que aparezca primero
      const newTab: Tab = {
        id: cercadorTabId,
        title: 'Cercador',
        content: '', // El contenido podría manejarse a través del componente
        component: CercadorGlobalComponent,
      };
      this.tabsService.openCercadorTabFirst(newTab);
    }
  }
}
