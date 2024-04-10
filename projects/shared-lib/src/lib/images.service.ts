// projects/shared-lib/src/lib/images.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor() {}

  // Método para obtener la URL de una imagen
  getImageUrl(imageName: string): string {
    return `./assets/images/${imageName}`;
  }
}
