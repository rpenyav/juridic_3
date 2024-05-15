import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RepLegalsTypeService } from './rep-legals.service';

@Component({
  selector: 'app-rep-legals',
  templateUrl: './rep-legals.component.html',
  styleUrls: ['./rep-legals.component.scss'],
})
export class RepLegalsComponent implements OnInit {
  repLegalsTypes: any[] = [];

  constructor(
    private repLegalsTypeService: RepLegalsTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRepLegalsTypes();
  }

  getRepLegalsTypes(): void {
    this.repLegalsTypeService.getRepLegalsTypes().subscribe({
      next: (data: any[]) => {
        this.repLegalsTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los repLegals:', error);
      },
      complete: () => {
        console.log('Obtención de repLegals completada');
      },
    });
  }
}
