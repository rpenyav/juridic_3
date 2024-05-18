import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { MenuItem } from 'projects/auxiliars/src/interfaces/menu';
import { I18nService } from 'shared-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  assetsBaseUrl = 'assets'; // Modify as needed for your environment
  menuItems: { [key: string]: MenuItem } = MENU_ITEMS;
  isExpanded = false;
  selectedMenuItem: string | null = null;
  translations: Record<string, any> = {};
  public translationsSubscription: Subscription;
  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.restoreMenuState();

    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations: Record<string, any>) => {
        this.translations = translations;
      },
      (error) => console.error('Error loading translations', error)
    );
  }

  translate(key: string): string {
    let parts = key.split('.');
    let result = this.translations;
    for (let part of parts) {
      if (result[part]) {
        result = result[part];
      } else {
        return key; // Devuelve la clave original si cualquier parte no existe
      }
    }
    return typeof result === 'string' ? result : key;
  }

  ngOnDestroy() {
    this.translationsSubscription.unsubscribe();
  }

  restoreMenuState() {
    const sidebarState = localStorage.getItem('sidebarExpanded');
    this.isExpanded = sidebarState === 'true';

    const selectedMenuItem = localStorage.getItem('selectedMenuItem');
    if (selectedMenuItem) {
      this.selectedMenuItem = selectedMenuItem;
      const parentKey = this.findParentMenuItemKey(selectedMenuItem);
      if (parentKey && this.menuItems[parentKey].children) {
        this.menuItems[parentKey].isOpen = true;
      }
    }
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('sidebarExpanded', this.isExpanded.toString());
    if (!this.isExpanded) {
      this.closeAllSubMenus();
    }
  }

  closeAllSubMenus() {
    Object.keys(this.menuItems).forEach((key) => {
      if (this.menuItems[key].children) {
        this.menuItems[key].isOpen = false;
      }
    });
  }

  toggleSubMenu(item: any) {
    if (!this.isExpanded) {
      this.toggleSidebar();
    }
    item.value.isOpen = !item.value.isOpen;
    this.selectedMenuItem = item.value.isOpen ? item.key : null;
    localStorage.setItem('selectedMenuItem', this.selectedMenuItem!);
  }

  selectMenuItem(itemKey: string) {
    this.selectedMenuItem = itemKey;
    localStorage.setItem('selectedMenuItem', itemKey);
  }

  findParentMenuItemKey(childKey: string): string | null {
    for (const key of Object.keys(this.menuItems)) {
      const item = this.menuItems[key];
      if (
        item.children &&
        Object.values(item.children).some((child) => child.url === childKey)
      ) {
        return key;
      }
    }
    return null;
  }

  getLangFromStorage(): string {
    return localStorage.getItem('userLang') || 'en';
  }
}
