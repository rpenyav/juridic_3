import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RelEmpresasTypeService } from './rel-empresas.service';

@Component({
  selector: 'app-rel-empresas',
  templateUrl: './rel-empresas.component.html',
  styleUrls: ['./rel-empresas.component.scss'],
})
export class RelEmpresasComponent implements OnInit {
  relEmpresasTypes: any[] = [];

  constructor(
    private relEmpresasTypeService: RelEmpresasTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRelEmpresasTypes();
  }

  getRelEmpresasTypes(): void {
    this.relEmpresasTypeService.getRelEmpresasTypes().subscribe({
      next: (data: any[]) => {
        this.relEmpresasTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los relEmpresas:', error);
      },
      complete: () => {
        console.log('Obtención de relEmpresas completada');
      },
    });
  }
}
