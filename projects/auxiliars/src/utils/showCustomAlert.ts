import { I18nService } from 'shared-lib';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// Función de utilidad para mostrar alertas personalizadas
export function showCustomAlert(
  i18n: I18nService,
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
  const title = customTitle || i18n.getInstant(titleKey); // Usa i18n.getInstant o el método equivalente en tu I18nService
  const text = i18n.getInstant(textKey); // Usa i18n.getInstant o el método equivalente
  const confirmButtonText = i18n.getInstant(confirmButtonTextKey); // Usa i18n.getInstant o el método equivalente
  const cancelButtonText = i18n.getInstant(cancelButtonTextKey); // Usa i18n.getInstant o el método equivalente

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
