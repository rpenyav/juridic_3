import Swal, { SweetAlertIcon } from 'sweetalert2';
import { I18nService } from 'shared-lib';

// Función de utilidad para mostrar alertas personalizadas
export function showCustomAlert(
  i18nService: I18nService,
  {
    titleKey = '',
    textKey = '',
    icon = 'warning' as SweetAlertIcon,
    showCancelButton = false,
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
    confirmButtonTextKey = '',
    cancelButtonTextKey = 'FORM.cancel', // Establece un valor predeterminado para el botón de cancelar
    customTitle = '',
  }
) {
  const title = customTitle || i18nService.getTranslation(titleKey);
  const text = i18nService.getTranslation(textKey);
  const confirmButtonText = i18nService.getTranslation(confirmButtonTextKey);
  const cancelButtonText = i18nService.getTranslation(cancelButtonTextKey); // Siempre traduce el texto del botón de cancelar

  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  });
}
