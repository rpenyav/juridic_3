import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarpetasTypeService } from './carpetas.service';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrls: ['./carpetas.component.scss'],
})
export class CarpetasComponent implements OnInit {
  carpetasTypes: any[] = [];

  constructor(
    private carpetasTypeService: CarpetasTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCarpetasTypes();
  }

  getCarpetasTypes(): void {
    this.carpetasTypeService.getCarpetasTypes().subscribe({
      next: (data: any[]) => {
        this.carpetasTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los carpetas:', error);
      },
      complete: () => {
        console.log('Obtención de carpetas completada');
      },
    });
  }
}
