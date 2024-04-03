import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParametersTypeService } from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent implements OnInit {
  parametersTypes: any[] = [];

  constructor(
    private parametersTypeService: ParametersTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getParametersTypes();
  }

  getParametersTypes(): void {
    this.parametersTypeService.getParametersTypes().subscribe({
      next: (data: any[]) => {
        this.parametersTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los parameters:', error);
      },
      complete: () => {
        console.log('Obtención de parameters completada');
      },
    });
  }
}
