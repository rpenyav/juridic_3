import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

// Función de utilidad para mostrar alertas personalizadas
export function showCustomAlert(
  txt: TranslateService,
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
  const title = customTitle || txt.instant(titleKey);
  const text = txt.instant(textKey);
  const confirmButtonText = txt.instant(confirmButtonTextKey);
  const cancelButtonText = txt.instant(cancelButtonTextKey); // Siempre traduce el texto del botón de cancelar

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
