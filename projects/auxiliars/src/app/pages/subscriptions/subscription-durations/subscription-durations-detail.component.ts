import {
  Component,
  HostListener,
  KeyValueChangeRecord,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { EditInterface } from 'src/app/interfaces/editInterface';
import { SubscriptionDuration } from 'src/app/interfaces/subscriptions/subscription-duration';

import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-durations-detail',
  templateUrl: './subscription-durations-detail.component.html',
  styleUrls: ['./subscription-durations.component.scss'],
})
export class SubscriptionDurationsDetailComponent implements OnInit {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  titol: string = '';

  id: string | null = null;
  registerDetail: SubscriptionDuration | null = null;
  originalData: SubscriptionDuration | null = null;
  loading: boolean = true;
  isEditing: boolean = false;
  tempChanges: { [key: string]: any } = {}; // Almacena temporalmente los cambios

  postLanguage: number = 1; // Idioma por defecto, por ejemplo, 1 para ES
  activeLanguage: number = 1; // Rastrea el idioma activo
  insertMode: boolean = false;
  newRecord: any = {};
  private _differ: any;

  showLangEdit: boolean = true; // el modulo es editable por idiomas?
  ENDPOINT = `${this.endpoints.SUBSCRIPTION_DURATIONS}`;
  icono: string = 'subscription-durations';
  redirectRoute: string = 'subscription-durations'; //ruta retorn al llistat
  titolKey = 'MENU.SUBSCRIPTION_DURATIONS';
  editFields: Array<EditInterface> = [
    {
      field: 'literalDescriptionText',
      type: 'string',
      captionKey: 'name',
    },
    {
      field: 'month',
      type: 'number',
      captionKey: 'name',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public generalService: GeneralService,
    private txt: TranslateService,
    public router: Router,
    private _differs: KeyValueDiffers
  ) {
    this._differ = this._differs.find({}).create();
  }

  ngDoCheck() {
    const change = this._differ.diff(this.registerDetail);
    if (change) {
      let postStorage: any = {};
      change.forEachAddedItem((record: KeyValueChangeRecord<any, any>) => {
        this.editFields.forEach((f) => {
          if (f.field == record.key) {
            f.value = record.currentValue;
            postStorage[record.key] = record.currentValue;
          }
        });
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  limpiarLocalStorage(): void {
    if (this.isEditing) {
      localStorage.removeItem('editData');
      localStorage.removeItem('insertData');
    }
  }

  ngOnInit(): void {
    //this.icono = MENU_ITEMS[this.icono].icon;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.titol = this.txt.instant(this.titolKey);
    });

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
      const updatedData: SubscriptionDuration = JSON.parse(updatedDataString);

      Object.getOwnPropertyNames(this.registerDetail).forEach((k) => {
        if (!updatedData.hasOwnProperty(k) && this.registerDetail) {
          updatedData[k] = this.registerDetail[k];
        }
      });

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
      const insertData: SubscriptionDuration = JSON.parse(insertDataString);
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
        .getRegisterTypeById<SubscriptionDuration>(dynamicEndpoint, idNum)
        .subscribe({
          next: (register: SubscriptionDuration | null) => {
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
      .createRegisterType<SubscriptionDuration>(
        customEndpoint,
        dataToSend as SubscriptionDuration
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
  saveChanges(updatedData: SubscriptionDuration): void {
    if (this.registerDetail && this.id) {
      const customEndpoint = this.ENDPOINT.replace(
        /\/api\/\d+\//,
        `/api/${this.postLanguage}/`
      );

      this.generalService
        .updateRegisterType<SubscriptionDuration>(
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
