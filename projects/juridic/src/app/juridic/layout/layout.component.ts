import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tabsService: TabsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Intenta obtener el ID de la pestaña de la URL al iniciar la app.
    const tabIdFromRoute = this.route.snapshot.paramMap.get('tabId');

    if (tabIdFromRoute) {
      // Si hay un ID de pestaña en la URL, selecciona esta pestaña directamente.
      this.tabsService.selectTab(tabIdFromRoute);
    } else {
      // Si no hay un ID de pestaña en la URL, intenta cargar el ID de pestaña seleccionado previamente desde LocalStorage.
      const selectedTabId =
        this.tabsService.loadSelectedTabIdFromLocalStorage();
      if (selectedTabId) {
        // Si hay un ID de pestaña seleccionado guardado, navega a esa pestaña.
        this.router.navigate(['/tabs', selectedTabId]);
      }
    }
  }
}
