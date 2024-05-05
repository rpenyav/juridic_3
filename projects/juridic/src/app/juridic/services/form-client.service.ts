import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultValidators } from '../utils/validator-form';
import { ClientModel } from '../interfaces/clients';

@Injectable({
  providedIn: 'root',
})
export class FormClientService {
  constructor(private fb: FormBuilder) {}

  initClientForm(client?: ClientModel): FormGroup {
    return this.fb.group({
      id: [client?.id || null],
      valid: [client?.valid || false, Validators.required],
      userModId: [client?.userModId || '', Validators.required],
      dateMod: [client?.dateMod || null],
      type: [client?.type || '', Validators.required],
      personTypeId: [client?.personTypeId || null, Validators.required],
      name: [
        client?.name || '',
        [Validators.required, Validators.maxLength(50)],
      ],
      surname: [
        client?.surname || '',
        [Validators.required, Validators.maxLength(50)],
      ],
      documentTypeId: [client?.documentTypeId || null, Validators.required],
      documentNumber: [client?.documentNumber || '', [Validators.required]], // Consider adding custom validators for specific formats
      conflictive: [client?.conflictive || false],
      conflictDescription: [client?.conflictDescription || ''],
      observations: [client?.observations || ''],
      nationalityId: [client?.nationalityId || null, Validators.required],
      languageId: [client?.languageId || null, Validators.required],
      paymentMethodId: [client?.paymentMethodId || null, Validators.required],
      relationCrId: [client?.relationCrId || null, Validators.required],
      addresses: this.fb.array(client?.addresses || []), // Arrays of complex objects might need to be initialized differently
      emails: this.fb.array(client?.emails || [], Validators.email), // Use Validators.email for email validation
      phones: this.fb.array(client?.phones || []),
      bankAccounts: this.fb.array(client?.bankAccounts || []),
      constitutionDate: [client?.constitutionDate || null],
      administrationSystem: [client?.administrationSystem || ''],
      patronalNumber: [client?.patronalNumber || null],
      numberOfWorkers: [client?.numberOfWorkers || null, Validators.min(0)],
      latePayment: [client?.latePayment || false],
      latePaymentDescription: [client?.latePaymentDescription || ''],
      subscriberAntiquity: [client?.subscriberAntiquity || null],
      accountingAccount: [client?.accountingAccount || null],
      activity: [client?.activity || ''],
      cnae: [client?.cnae || null],
      centers: this.fb.array(client?.centers || []),
      contactPersons: this.fb.array(client?.contactPersons || []),
      cooperativesRegisterNumber: [client?.cooperativesRegisterNumber || ''],
      genderId: [client?.genderId || 0],
    });
  }
}
