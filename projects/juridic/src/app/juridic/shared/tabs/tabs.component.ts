import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TabsService } from '../../services/tabs.service';
import { Tab } from '../../interfaces/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  tabs: Tab[] = [];
  currentTab: Tab | null = null;

  constructor(private tabsService: TabsService, private router: Router) {}

  ngOnInit() {
    this.tabsService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
      // Actualizar la pestaña actual basada en las pestañas disponibles.
      this.currentTab =
        tabs.find((tab) => tab.id === this.currentTab?.id) || tabs[0] || null;
    });

    this.tabsService.currentTab$.subscribe((tab) => {
      this.currentTab = tab;
      // Navegar a la pestaña actual si existe.
      if (tab) {
        this.router.navigate(['/tabs', tab.id]);
      }
    });
  }

  selectTab(tabId: string) {
    this.tabsService.selectTab(tabId);
  }

  closeTab(tabId: string, event: Event) {
    event.stopPropagation();
    if (tabId === 'cercadorTab') {
      this.tabsService.closeTab(tabId);
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Si cierras esta pestaña, el contenido se perderá para siempre.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.tabsService.closeTab(tabId);
        }
      });
    }
  }
}
