import { Validators, AbstractControl } from '@angular/forms';

export function spanishDniValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const validDni = /^[XYZ]?\d{7,8}[A-Z]$/i;
  return validDni.test(control.value) ? null : { invalidDni: true };
}

export const defaultValidators = {
  valid: Validators.required,
  userModId: Validators.required,
  dateMod: null, // Sin validador específico
  type: Validators.required,
  personTypeId: Validators.required,
  name: [Validators.required, Validators.maxLength(50)],
  surname: [Validators.required, Validators.maxLength(50)],
  documentTypeId: Validators.required,
  documentNumber: [Validators.required, spanishDniValidator],
  conflictive: null, // Sin validador específico, booleano
  conflictDescription: null, // Sin validador específico
  observations: null, // Sin validador específico
  nationalityId: Validators.required,
  languageId: Validators.required,
  paymentMethodId: Validators.required,
  relationCrId: Validators.required,
  addresses: null, // Manejo específico si es necesario
  emails: [Validators.email],
  phones: null, // Puede requerir validadores específicos de formato de teléfono
  bankAccounts: null, // Puede requerir validadores específicos
  constitutionDate: null, // Sin validador específico
  administrationSystem: null, // Sin validador específico
  patronalNumber: null, // Sin validador específico
  numberOfWorkers: Validators.min(0), // Asegurarse de que no sea negativo
  latePayment: null, // Sin validador específico, booleano
  latePaymentDescription: null, // Sin validador específico
  subscriberAntiquity: null, // Sin validador específico
  accountingAccount: null, // Sin validador específico
  activity: null, // Sin validador específico
  cnae: null, // Sin validador específico
  centers: null, // Sin validador específico
  contactPersons: null, // Sin validador específico
  cooperativesRegisterNumber: null, // Sin validador específico
};
