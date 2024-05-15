import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { environment } from 'src/environments/environment';
import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { ComModes } from 'src/app/interfaces/communications/modes';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-communication-modes-detail',
  templateUrl: './communication-modes-detail.component.html',
  styleUrls: ['./communication-modes-detail.component.scss'],
})
export class CommunicationModesDetailComponent implements OnInit {
  assetsBaseUrl = environment.assetsBaseUrl;
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.COMMUNICATIONS_MODES}`;
  iconoS: string = 'comTypes';
  icono: string = 'walky';
  langUser = localStorage.getItem('userLang') || 'defaultLang';
  redirectRoute: string = `/${this.langUser}/communications/modes`; //ruta retorn al llistat
  id: string | null = null;
  registerDetail: ComModes | null = null;
  originalData: ComModes | null = null;
  loading: boolean = true;
  isEditing: boolean = false;
  tempChanges: { [key: string]: any } = {}; // Almacena temporalmente los cambios
  showLangEdit: boolean = true; // el modulo es editable por idiomas?
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
    const localitTypes = MENU_ITEMS[this.iconoS]?.children;
    localitTypes?.find((child) => child.key === this.icono);
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
      const updatedData: ComModes = JSON.parse(updatedDataString);
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
      const insertData: ComModes = JSON.parse(insertDataString);
      this.submitNewRecord(insertData);
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
        .getRegisterTypeById<ComModes>(dynamicEndpoint, idNum)
        .subscribe({
          next: (register: ComModes | null) => {
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
  submitNewRecord(insertData: ComModes): void {
    const customEndpoint = this.ENDPOINT.replace(
      /\/api\/\d+\//,
      `/api/${this.postLanguage}/`
    );

    this.generalService
      .createRegisterType<ComModes>(customEndpoint, insertData)
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
            text: `No se pudo crear el registro debido a: ${error}. Por favor, inténtelo de nuevo más tarde.`,
          });
        },
      });
  }

  /**
   * guarda els canvis de la edicio
   * @param updatedData
   */
  saveChanges(updatedData: ComModes): void {
    if (this.registerDetail && this.id) {
      const customEndpoint = this.ENDPOINT.replace(
        /\/api\/\d+\//,
        `/api/${this.postLanguage}/`
      );

      this.generalService
        .updateRegisterType<ComModes>(
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
