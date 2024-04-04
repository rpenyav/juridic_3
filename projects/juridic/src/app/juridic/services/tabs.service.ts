import { Router } from '@angular/router';
import { Tab } from '../interfaces/tabs';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  tabs$ = this.tabsSubject.asObservable();

  private currentTabSubject = new BehaviorSubject<Tab | null>(null);
  currentTab$ = this.currentTabSubject.asObservable();

  constructor(private router: Router) {
    this.loadTabsFromLocalStorage();
  }

  openTab(tab: Tab) {
    const tabs = [...this.tabsSubject.value, tab];
    this.tabsSubject.next(tabs);
    this.saveTabsToLocalStorage();
    this.router.navigate(['/tabs', tab.id]); // Navegar a la pestaña recién abierta
  }

  selectTab(tabId: string) {
    this.saveSelectedTabIdToLocalStorage(tabId);
    this.router.navigate(['/tabs', tabId]); // Navegar a la pestaña seleccionada
  }

  closeTab(tabId: string) {
    const tabs = this.tabsSubject.value.filter((tab) => tab.id !== tabId);
    this.tabsSubject.next(tabs);
    this.saveTabsToLocalStorage();

    // Eliminar el ID de la pestaña seleccionada de localStorage si la pestaña cerrada era la actualmente seleccionada
    const selectedTabId = this.loadSelectedTabIdFromLocalStorage();
    if (tabId === selectedTabId) {
      this.removeSelectedTabIdFromLocalStorage();
    }

    if (tabs.length > 0) {
      // Si la pestaña cerrada era la seleccionada, seleccionar otra pestaña. Si no, mantener la selección actual si es posible.
      if (tabId === selectedTabId) {
        this.router.navigate(['/tabs', tabs[0].id]); // Selecciona la primera pestaña disponible
        this.saveSelectedTabIdToLocalStorage(tabs[0].id);
      } else if (
        !selectedTabId ||
        !tabs.some((tab) => tab.id === selectedTabId)
      ) {
        // Si no hay una pestaña seleccionada o la pestaña seleccionada ya no existe, seleccionar la primera pestaña disponible
        this.router.navigate(['/tabs', tabs[0].id]);
        this.saveSelectedTabIdToLocalStorage(tabs[0].id);
      }
    } else {
      this.router.navigate(['/']); // Navegar a la ruta predeterminada si no hay pestañas
    }
  }

  private saveTabsToLocalStorage() {
    localStorage.setItem('tabs', JSON.stringify(this.tabsSubject.value));
  }

  private loadTabsFromLocalStorage() {
    const tabs: Tab[] = JSON.parse(localStorage.getItem('tabs') || '[]');
    this.tabsSubject.next(tabs);
  }

  private saveSelectedTabIdToLocalStorage(tabId: string) {
    localStorage.setItem('selectedTabId', tabId);
  }

  public loadSelectedTabIdFromLocalStorage(): string | null {
    return localStorage.getItem('selectedTabId');
  }

  private removeSelectedTabIdFromLocalStorage() {
    localStorage.removeItem('selectedTabId');
  }

  getTabById(tabId: string): Tab | undefined {
    return this.tabsSubject.value.find((tab) => tab.id === tabId);
  }

  openCercadorTabFirst(tab: Tab) {
    let tabs = this.tabsSubject.value;
    const existingIndex = tabs.findIndex((t) => t.id === tab.id);

    if (existingIndex > -1) {
      // La pestaña ya existe, simplemente asegúrate de que esté seleccionada
      this.selectTab(tab.id);
    } else {
      // La pestaña no existe, así que añádela al principio y selecciona
      tabs = [tab, ...tabs];
      this.tabsSubject.next(tabs);
      this.saveTabsToLocalStorage();
      this.selectTab(tab.id);
    }
  }
}
