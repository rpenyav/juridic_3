import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { I18nService } from 'shared-lib';
import {
  actualizarSessionStorage,
  cargarTabsDesdeSessionStorage,
  cerrarTab,
  seleccionarBuscador,
  seleccionarTab as seleccionarTabHelper,
} from '../utils/functions';
import { ExpCercadorComponent } from './exp-cercador/exp-cercador.component';
import { TabsModel } from '../interfaces/tabs';
import { ExpedienteModel } from '../interfaces/expedientes';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
})
export class ExpedientesComponent implements OnInit {
  endpoint = 'expedientes';
  typeofbus = 'expedientes';
  sessionStorageKey = 'expedient-search';
  sessionStorageKeyTabs = 'exp-tabs';
  buscadorRoute = '/juridic/expedientes/buscador';
  tabsRoutePrefix = '/juridic/expedientes';
  tabIdPrefix = 'exp';
  translations: Record<string, any> = {};

  public translationsSubscription: Subscription;
  registros: ExpedienteModel[] = [];
  componenteARenderizar: Type<any> = ExpCercadorComponent;
  //--------------------------------------------------------
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContentRef: ViewContainerRef;
  mostrarBuscador = false;
  buscadorSeleccionado = false;
  private urlSub: Subscription;
  activeTabId: string | null = null;
  thisTabs: TabsModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.urlSub = this.route.url.subscribe((urlSegments) => {
      const isBuscadorRoute = urlSegments.some(
        (segment) => segment.path === 'buscador'
      );
      this.mostrarBuscador = isBuscadorRoute;
      this.buscadorSeleccionado = isBuscadorRoute;
      this.cargarTabsDesdeSessionStorage();

      if (isBuscadorRoute) {
        sessionStorage.setItem(this.sessionStorageKey, 'true');
      }
    });

    this.translationsSubscription = this.i18nService.translations$.subscribe(
      (translations: Record<string, any>) => {
        this.translations = translations;
        this.cdr.detectChanges();
      },
      (error) => console.error('Error loading translations', error)
    );
  }

  ngOnDestroy() {
    if (this.urlSub) {
      this.urlSub.unsubscribe();
    }
  }

  seleccionarBuscador() {
    seleccionarBuscador(
      this.buscadorRoute,
      this.thisTabs,
      this.actualizarSessionStorage.bind(this),
      this.cdr,
      this.router
    );
  }

  cargarTabsDesdeSessionStorage() {
    cargarTabsDesdeSessionStorage(this.sessionStorageKeyTabs, (tabs) => {
      this.thisTabs = tabs;
    });
  }

  handleReferenciaClickFromCercador(itemId: any) {
    if (itemId && typeof itemId === 'object') {
      if (itemId._id) {
        itemId.id = itemId._id;
      }
    }
    this.agregarTab(itemId);
  }
  agregarTab(itemId: any) {
    const newTab: TabsModel = {
      id: `${itemId.id}`,
      title: `${this.translations.SECTION.expedientes} ${itemId.numexpedient}`,
      content: '',
      isSelected: true,
    };

    this.thisTabs.forEach((tab) => (tab.isSelected = false));
    this.thisTabs.push(newTab);
    this.actualizarSessionStorage();
    this.router.navigate([this.tabsRoutePrefix, newTab.id]);
  }

  cerrarTab(tabId: string) {
    cerrarTab(
      tabId,
      this.thisTabs,
      (newTabs) => (this.thisTabs = newTabs),
      (route) => this.router.navigate([route]),
      () => this.actualizarSessionStorage(),
      () => this.seleccionarBuscador(),
      this.tabsRoutePrefix
    );
  }

  actualizarSessionStorage() {
    actualizarSessionStorage(this.sessionStorageKeyTabs, this.thisTabs);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && !isNaN(+event.key)) {
      const tabIndex = parseInt(event.key, 10) - 1;
      if (tabIndex >= 0 && tabIndex < this.thisTabs.length) {
        this.seleccionarTabPorIndice(tabIndex);
      }
    }
  }

  seleccionarTabPorIndice(indice: number) {
    const tabId = this.thisTabs[indice].id;
    this.seleccionarTab(tabId);
  }

  seleccionarTab(tabId: string) {
    seleccionarTabHelper({
      tabId: tabId,
      setBuscadorSeleccionado: (value: boolean) => {
        this.buscadorSeleccionado = value;
      },
      tabs: this.thisTabs,
      tabsRoutePrefix: this.tabsRoutePrefix,
      actualizarSessionStorage: this.actualizarSessionStorage.bind(this),
      navigate: this.router.navigate.bind(this.router),
      buscadorRoute: this.buscadorRoute,
      sessionStorageKeyTabs: this.sessionStorageKeyTabs,
    });
    this.cdr.detectChanges();
  }
}
