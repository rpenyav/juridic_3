import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProEcoTypeService } from './pro-eco.service';

@Component({
  selector: 'app-pro-eco',
  templateUrl: './pro-eco.component.html',
  styleUrls: ['./pro-eco.component.scss'],
})
export class ProEcoComponent implements OnInit {
  proEcoTypes: any[] = [];

  constructor(
    private proEcoTypeService: ProEcoTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProEcoTypes();
  }

  getProEcoTypes(): void {
    this.proEcoTypeService.getProEcoTypes().subscribe({
      next: (data: any[]) => {
        this.proEcoTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los proEco:', error);
      },
      complete: () => {
        console.log('Obtención de proEco completada');
      },
    });
  }
}
