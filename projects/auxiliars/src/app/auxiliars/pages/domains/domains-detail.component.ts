import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getApiEndpoints } from '../../../constants/api-endpoints.constants';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { Domains } from '../../interfaces/domains';
import { GeneralService } from '../../services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-domains-detail',
  templateUrl: './domains-detail.component.html',
  styleUrls: ['./domains-detail.component.scss'],
})
export class DomainsDetailComponent implements OnInit {
  endpoints = getApiEndpoints();
  ENDPOINT = `${this.endpoints.DOMAINS_ENDPOINT}`;
  icono: string = 'domainsType';
  id: string | null = null;
  registerDetail: Domains | null = null;
  originalData: Domains | null = null;
  loading: boolean = true;
  isEditing: boolean = false;
  tempChanges: { [key: string]: any } = {}; // Almacena temporalmente los cambios
  showLangEdit: boolean = false; // el modulo es editable por idiomas?
  postLanguage: number = 1; // Idioma por defecto, por ejemplo, 1 para ES
  activeLanguage: number = 1; // Rastrea el idioma activo

  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  limpiarLocalStorage(): void {
    if (this.isEditing) {
      localStorage.removeItem('editData');
    }
  }

  ngOnInit(): void {
    this.icono = MENU_ITEMS[this.icono].icon;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadRegisterDetail();
  }

  changePostLanguage(newLanguage: number): void {
    this.postLanguage = newLanguage;
    this.activeLanguage = newLanguage;
    console.log('activeLanguage', this.activeLanguage); // Mover aquí
    console.log('postLanguage', this.postLanguage); // Mover aquí
  }

  handleFieldChange(
    fieldName: string,
    updatedValue: string | number | boolean
  ): void {
    if (this.registerDetail) {
      if (fieldName === 'capacity' || fieldName === 'deskId') {
        this.registerDetail[fieldName] = Number(updatedValue);
      } else {
        this.registerDetail[fieldName] = updatedValue;
      }
    }
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.registerDetail = JSON.parse(JSON.stringify(this.originalData));
      localStorage.removeItem('editData');
      this.loadRegisterDetail();
    }

    this.isEditing = !this.isEditing;
  }

  toggleSave(): void {
    const updatedDataString = localStorage.getItem('editData');
    if (updatedDataString) {
      const updatedData: Domains = JSON.parse(updatedDataString);
      this.saveChanges(updatedData);
      localStorage.removeItem('editData');
      this.isEditing = !this.isEditing;
      this.loadRegisterDetail();
    }
  }

  loadRegisterDetail(): void {
    const idNum = Number(this.id);
    if (!isNaN(idNum)) {
      this.generalService
        .getRegisterTypeById<Domains>(this.ENDPOINT, idNum)
        .subscribe({
          next: (register: Domains | null) => {
            this.registerDetail = register;
            this.loading = false;
          },
          error: (error: any) => {
            console.error('Error al recuperar el detalle del registro:', error);
            this.loading = false;
          },
          complete: () => {
            console.log('data loaded');
          },
        });
    } else {
      this.loading = false;
    }
  }

  saveChanges(updatedData: Domains): void {
    if (this.registerDetail && this.id) {
      const customEndpoint = this.ENDPOINT.replace(
        /\/api\/\d+\//,
        `/api/${this.postLanguage}/`
      );

      console.log('Custom Endpoint:', customEndpoint);

      this.generalService
        .updateRegisterType<Domains>(
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
