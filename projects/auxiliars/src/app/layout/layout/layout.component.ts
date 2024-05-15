import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'src/interfaces/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  assetsBaseUrl = environment.assetsBaseUrl;
  @ViewChild('drw') drw!: ElementRef;
  menuItems: { [key: string]: MenuItem } = MENU_ITEMS;
  isExpanded = false;
  selectedMenuItem: string | null = null;

  ngOnInit() {
    this.restoreMenuState();
  }

  restoreMenuState() {
    const sidebarState = localStorage.getItem('sidebarExpanded');
    this.isExpanded = sidebarState === 'true';

    // Restaura el ítem de menú seleccionado si existe en el almacenamiento local
    const selectedMenuItem = localStorage.getItem('selectedMenuItem');
    if (selectedMenuItem) {
      this.selectedMenuItem = selectedMenuItem;

      // Intenta expandir el menú padre del ítem seleccionado, si aplica
      const parentKey = this.findParentMenuItemKey(selectedMenuItem);
      if (parentKey && this.menuItems[parentKey].children) {
        this.menuItems[parentKey].isOpen = true;
      }
    }
  }

  getLangFromStorage(): string {
    return localStorage.getItem('userLang') || 'en';
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('sidebarExpanded', this.isExpanded.toString());
    if (!this.isExpanded) {
      this.closeAllSubMenus();
    }
  }

  closeAllSubMenus(): void {
    Object.keys(this.menuItems).forEach((key) => {
      const item = this.menuItems[key];
      if (item.children) {
        item.isOpen = false;
      }
    });
  }

  toggleSubMenu(item: any): void {
    // Cierra todos los submenús, excepto el actualmente seleccionado
    Object.keys(this.menuItems).forEach((key) => {
      if (key !== item.key && this.menuItems[key].children) {
        this.menuItems[key].isOpen = false;
      }
    });

    // Alterna el estado abierto del ítem actual y actualiza el ítem seleccionado
    item.value.isOpen = !item.value.isOpen;
    this.selectedMenuItem = item.value.isOpen ? item.key : null;
    localStorage.setItem('selectedMenuItem', this.selectedMenuItem!);
  }

  selectMenuItem(itemKey: string): void {
    this.selectedMenuItem = itemKey;
    localStorage.setItem('selectedMenuItem', itemKey);
    // Opcionalmente, podrías querer cerrar todos los submenús aquí
  }

  findParentMenuItemKey(childKey: string): string | null {
    for (const key of Object.keys(this.menuItems)) {
      const item = this.menuItems[key];
      if (
        item.children &&
        Object.keys(item.children).some((k) => k === childKey)
      ) {
        return key;
      }
    }
    return null;
  }
}
