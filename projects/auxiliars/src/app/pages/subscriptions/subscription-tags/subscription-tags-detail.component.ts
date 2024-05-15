import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
//import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { SubscriptionTag } from 'src/app/interfaces/subscriptions/subscription-tags';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-tags-detail',
  templateUrl: './subscription-tags-detail.component.html',
  styleUrls: ['./subscription-tags-detail.component.scss'],
})
export class SubscriptionTagDetailComponent implements OnInit {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.VISIT_ROOMS}`;
  icono: string = 'subscriptiontags';
  redirectRoute: string = 'subscription-tags'; //ruta retorn al llistat
  id: string | null = null;
  registerDetail: SubscriptionTag | null = null;
  originalData: SubscriptionTag | null = null;
  loading: boolean = true;
  isEditing: boolean = false;
  tempChanges: { [key: string]: any } = {}; // Almacena temporalmente los cambios
  showLangEdit: boolean = false; // el modulo es editable por idiomas?
  postLanguage: number = 1; // Idioma por defecto, por ejemplo, 1 para ES
  activeLanguage: number = 1; // Rastrea el idioma activo
  insertMode: boolean = false;
  newRecord: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    public generalService: GeneralService,
    public router: Router
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  limpiarLocalStorage(): void {
    if (this.isEditing) {
      localStorage.removeItem('editData');
      localStorage.removeItem('insertData');
    }
  }

  ngOnInit(): void {
    // this.icono = MENU_ITEMS[this.icono].icon;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id === 'add') {
      this.insertMode = true;
      this.loading = false;
    } else {
      this.loadRegisterDetail();
    }
  }

  changePostLanguage(newLanguage: number): void {
    this.postLanguage = newLanguage;
    this.activeLanguage = newLanguage;
    this.loadRegisterDetail();
  }

  handleFieldChange(
    fieldName: string,
    updatedValue: any
  ): void {
    if (this.registerDetail) {
      if (fieldName === 'capacity' || fieldName === 'deskId') {
        this.registerDetail[fieldName] = Number(updatedValue);
      } else {
        this.registerDetail[fieldName] = updatedValue;
      }
    }
  }

  /**
   * toggle ed
   */
  toggleEdit(): void {
    if (this.isEditing) {
      this.registerDetail = JSON.parse(JSON.stringify(this.originalData));
      localStorage.removeItem('editData');
      this.loadRegisterDetail();
    }

    this.isEditing = !this.isEditing;
  }

  /**
   * obte el endpoint i canvia el idioma
   */
  getDynamicEndpoint(): string {
    const endpointWithLanguage = this.ENDPOINT.replace(
      '{lang}',
      this.postLanguage.toString()
    );
    return endpointWithLanguage;
  }

  /**
   * toggle edition
   */
  toggleSave(): void {
    const updatedDataString = localStorage.getItem('editData');
    if (updatedDataString) {
      const updatedData: SubscriptionTag = JSON.parse(updatedDataString);
      this.saveChanges(updatedData);
      localStorage.removeItem('editData');
      this.isEditing = !this.isEditing;
      this.loadRegisterDetail();
    }
  }

  /**
   * toggle insert
   */
  toggleInsert(): void {
    const insertDataString = localStorage.getItem('insertData');
    if (insertDataString) {
      const insertData: SubscriptionTag = JSON.parse(insertDataString);
      this.submitNewRecord(insertData, this.postLanguage);
    }
  }
  /**
   *  CARREGA EL FORMULARI AMB DADES
   */
  loadRegisterDetail(): void {
    const idNum = Number(this.id);
    if (!isNaN(idNum)) {
      const dynamicEndpoint = this.ENDPOINT.replace(
        /\/api\/\d+\//,
        `/api/${this.postLanguage}/`
      );
      this.generalService
        .getRegisterTypeById<SubscriptionTag>(dynamicEndpoint, idNum)
        .subscribe({
          next: (register: SubscriptionTag | null) => {
            this.registerDetail = register;
            this.loading = false;
          },
          error: (error: any) => {
            console.error('Error al recuperar el detalle del registro:', error);
            this.loading = false;
          },
          complete: () => console.log('data loaded'),
        });
    } else {
      this.loading = false;
    }
  }

  /**
   * onsave
   * @param fieldName
   * @param value
   */
  onSave(fieldName: string, value: string | number | boolean): void {
    this.newRecord[fieldName] = value;
  }

  /**
   * INSERT
   * @param insertData
   */
  submitNewRecord(insertData: any, language: number): void {
    const dataToSend: any = {};

    Object.keys(insertData).forEach((field) => {
      const fieldData = insertData[field];
      let convertedValue;
      switch (fieldData.type) {
        case 'number':
          convertedValue = Number(fieldData.value);
          break;
        case 'boolean':
          convertedValue =
            fieldData.value === 'true' || fieldData.value === true;
          break;
        default:
          convertedValue = fieldData.value;
      }
      dataToSend[field] = convertedValue;
    });

    const customEndpoint = this.ENDPOINT.replace(
      /\/api\/\d+\//,
      `/api/${language}/`
    );

    this.generalService
      .createRegisterType<SubscriptionTag>(
        customEndpoint,
        dataToSend as SubscriptionTag
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Creación exitosa!',
            text: 'El nuevo registro ha sido creado correctamente.',
          }).then((result) => {
            if (result.isConfirmed) {
              const userLang =
                localStorage.getItem('userLang') || 'defaultLang';
              this.router.navigate([`/${userLang}/${this.redirectRoute}`]);
            }
          });
          localStorage.removeItem('insertData');
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear',
            text: `No se pudo crear el registro debido a: ${error.message}. Por favor, inténtelo de nuevo más tarde.`,
          });
        },
      });
  }

  /**
   * guarda els canvis de la edicio
   * @param updatedData
   */
  saveChanges(updatedData: SubscriptionTag): void {
    if (this.registerDetail && this.id) {
      const customEndpoint = this.ENDPOINT.replace(
        /\/api\/\d+\//,
        `/api/${this.postLanguage}/`
      );

      this.generalService
        .updateRegisterType<SubscriptionTag>(
          customEndpoint,
          Number(this.id),
          updatedData
        )
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Actualización exitosa!',
              text: `El registro ha sido actualizado correctamente.`,
            });
            this.loadRegisterDetail();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar',
              text: `No se pudo actualizar el registro debido a: ${error}. Por favor, inténtelo de nuevo más tarde.`,
            });
            this.loadRegisterDetail();
          },
        });
    }
  }
}
