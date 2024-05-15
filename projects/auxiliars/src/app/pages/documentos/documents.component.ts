import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentsTypeService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  documentsTypes: any[] = [];

  constructor(
    private documentsTypeService: DocumentsTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDocumentsTypes();
  }

  getDocumentsTypes(): void {
    this.documentsTypeService.getDocumentsTypes().subscribe({
      next: (data: any[]) => {
        this.documentsTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los documents:', error);
      },
      complete: () => {
        console.log('Obtención de documents completada');
      },
    });
  }
}
