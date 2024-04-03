import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from 'shared-lib'; // Asegúrate de ajustar la ruta de importación

@Pipe({
  name: 'translate',
  pure: false, // Esto permite que el pipe se actualice cuando cambie el idioma
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(value: string): string {
    return this.i18nService.getTranslation(value);
  }
}
