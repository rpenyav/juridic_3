import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProvincesTypeService } from './provinces.service';
import { PaginatedResponse, Province } from 'src/app/interfaces/provinces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { showCustomAlert } from 'src/utils/showCustomAlert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss'],
})
export class ProvincesComponent implements OnInit {
  provincesData: Province[] = [];
  allProvincesData: Province[] = []; // Almacenará todas las provincias para el filtrado
  filteredRegistersData: Province[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  allDatAll: Province[] = []; //muestra todo los regitros para e filtrado
  totalElements: number = 0;
  loading: boolean = true;
  filterValue: string = '';
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  currentAction!: string;
  selectedRegister: any;
  modalTitle!: string;
  formForm!: FormGroup;
  orderDirection: string = 'asc';
  orderBy: string = 'name';
  detailUrl:string = "provinces";

  constructor(
    private provincesTypeService: ProvincesTypeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private txt: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedPageNumber = sessionStorage.getItem(this.detailUrl + ".pageNumber");
    if (savedPageNumber !== null) {
      this.pageNumber = +savedPageNumber;
    }
    this.loadAllRegisters();
    this.getRegisters();
    this.formfields();
  }

  getLangFromStorage(): string {
    return localStorage.getItem('userLang') || 'ca';
  }

  // ---------------------------------------------------------------------------
  // métodos de la modal
  // ---------------------------------------------------------------------------

  openModal(action: 'edit' | 'view' | 'add', province: any = null) {
    this.currentAction = action;
    this.selectedRegister = province;

    // Configura el contenido de la modal según la acción
    if (action === 'edit') {
      this.modalTitle = this.txt.instant('FORM.edit_province');
      // Carga los datos de la provincia en el formulario para la edición
      this.formForm.patchValue({
        name: this.selectedRegister.name,
        code: this.selectedRegister.code,
      });
    } else if (action === 'add') {
      this.modalTitle = this.txt.instant('FORM.new_record');
      // Resetea el formulario para asegurarse de que está limpio para un nuevo registro
      this.formForm.reset();
    }

    this.modalService.open(this.modalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  // ---------------------------------------------------------------------------
  // carga de datos
  // ---------------------------------------------------------------------------

  loadAllRegisters(): void {
    this.provincesTypeService
      .getProvincesTypes(undefined, undefined)
      .subscribe({
        next: (data: PaginatedResponse) => {
          this.allProvincesData = data.list;
        },
        error: (error) => console.error(error),
      });
  }

  getRegisters(): void {
    this.provincesTypeService
      .getProvincesTypes(this.pageNumber, this.pageSize)
      .subscribe({
        next: (data: PaginatedResponse) => {
          this.provincesData = data.list;
          this.allDatAll = data.allData;
          console.log(this.allDatAll);
          this.filteredRegistersData = [...this.provincesData];
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.filterRegisters(this.filterValue);
        },
        error: (error) => console.error(error),
        complete: () => (this.loading = false),
      });
  }

  filterRegisters(filterValue: string): void {
    this.filterValue = filterValue;
    if (!this.filterValue) {
      this.filteredRegistersData = [...this.provincesData];
    } else {
      this.filteredRegistersData = this.allDatAll.filter((province) =>
        province.name.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
   sessionStorage.setItem(this.detailUrl + ".pageNumber", pageNumber.toString());
    this.getRegisters();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ---------------------------------------------------------------------------
  // ORDENACIO
  //
  // ---------------------------------------------------------------------------

  toggleSort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = field;
      this.orderDirection = 'asc';
    }
    this.sortData();
  }

  sortData() {
    this.filteredRegistersData.sort((a, b) => {
      let comparison = 0;
      if ((a as any)[this.orderBy] < (b as any)[this.orderBy]) {
        comparison = -1;
      } else if ((a as any)[this.orderBy] > (b as any)[this.orderBy]) {
        comparison = 1;
      }
      return this.orderDirection === 'asc' ? comparison : -comparison;
    });
  }

  // ---------------------------------------------------------------------------
  // FORMULARIO
  // estos son los campos del formulario
  // ---------------------------------------------------------------------------

  formfields(): void {
    //aqui debemos añadir los campos que deben ser validados en los formularios de añadir y editar
    this.formForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  onSubmitAdd(): void {
    if (this.formForm.valid) {
      this.create(this.formForm.value);
    } else {
      console.log('El formulario no es válido.');
    }
  }

  onSubmit(): void {
    if (this.formForm.valid) {
      this.edit(this.formForm.value);
    }
  }

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(provinceData: any) {
    this.provincesTypeService.createProvincesType(provinceData).subscribe({
      next: (response) => {
        console.log(response);
        showCustomAlert(this.txt, {
          titleKey: 'FORM.create_success_title',
          textKey: 'FORM.create_success_message',
          icon: 'success',
          confirmButtonTextKey: 'FORM.ok',
        });
      },
      error: (error) => {
        console.error('Error al crear el registro:', error);
        showCustomAlert(this.txt, {
          titleKey: 'FORM.create_error_title',
          textKey: 'FORM.create_error_message',
          icon: 'error',
          confirmButtonTextKey: 'FORM.ok',
        });
      },
    });
  }

  /**
   * aqui definimos la ruta de la pagina de detalle
   * para ello definiremos aqui la ruta y añadiremos al componente shared dynamic-detail
   * no es necesario añadirla al routing component
   * @param provinceId
   */
  viewDetails(provinceId: string | number) {
    const currentLang = this.getLangFromStorage();

    this.router.navigate([
      '/' + currentLang + '/locations/provinces',
      provinceId,
    ]);
  }

  /**
   * funcio de modificacio
   * @param province
   */
  edit(province: Province) {
    this.provincesTypeService
      .updateProvincesType(province.id, province)
      .subscribe({
        next: (response) => {
          console.log(response);
          showCustomAlert(this.txt, {
            titleKey: 'FORM.edit_success_title',
            textKey: 'FORM.edit_success_message',
            icon: 'success',
            confirmButtonTextKey: 'FORM.modify',
          });
        },
        error: (error) => {
          console.error('Error al editar el registro:', error);
          showCustomAlert(this.txt, {
            titleKey: 'FORM.edit_error_title',
            textKey: 'FORM.edit_error_message',
            icon: 'error',
            confirmButtonTextKey: 'FORM.ok',
          });
        },
      });
  }

  delete(province: Province) {
    const titleWithName = `${this.txt.instant('FORM.desea_eliminar')} "${
      province.name
    }"?`;

    showCustomAlert(this.txt, {
      titleKey: 'FORM.title_swa',
      textKey: 'FORM.text_swa',
      confirmButtonTextKey: 'FORM.yes_delete',
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceder con la eliminación...
      }
    });
  }
}
