import { v4 as uuidv4 } from 'uuid';
import {
  ChangeDetectorRef,
  Component,
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
  // verifyAndRender,
} from '../utils/functions';
import { ExpCercadorComponent } from './exp-cercador/exp-cercador.component';
import { TabsModel } from '../interfaces/tabs';
import { ExpByIdComponent } from './exp-by-id/exp-by-id.component';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css'],
})
export class ExpedientesComponent implements OnInit {
  sectionTitle = 'SECTION.expedient';
  sessionStorageKey = 'expedient-search';
  sessionStorageKeyTabs = 'exp-tabs';
  buscadorRoute = '/juridic/expedientes/buscador';
  tabsRoutePrefix = '/juridic/expedientes';
  tabIdPrefix = 'exp';
  defaultTabTitle = 'Expediente';
  //--------------------------------------------------------
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContentRef: ViewContainerRef;
  translations: Record<string, string> = {};
  public translationsSubscription: Subscription;
  mostrarBuscador = false;
  buscadorSeleccionado = false;
  private urlSub: Subscription;
  componenteARenderizar: Type<any> = ExpCercadorComponent;
  activeTabId: string | null = null;
  thisTabs: TabsModel[] = [];

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
      (translations: Record<string, string>) => {
        this.translations = translations;
      }
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
    this.agregarTab(itemId);
  }

  agregarTab(id: number) {
    const newTab: TabsModel = {
      id: `${this.tabIdPrefix}-${id}`,
      title: `${this.defaultTabTitle} ${id}`,
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

  seleccionarTab(tabId: string) {
    seleccionarTabHelper({
      tabId: tabId,
      setBuscadorSeleccionado: (value: boolean) => {
        this.buscadorSeleccionado = value;
      },
      tabs: this.thisTabs,
      actualizarSessionStorage: this.actualizarSessionStorage.bind(this),
      navigate: this.router.navigate.bind(this.router),
      buscadorRoute: this.buscadorRoute,
      sessionStorageKeyTabs: this.sessionStorageKeyTabs,
    });
    this.cdr.detectChanges();
  }
}
