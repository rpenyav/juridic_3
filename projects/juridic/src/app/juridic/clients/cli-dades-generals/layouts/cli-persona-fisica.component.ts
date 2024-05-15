import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientModel } from '../../../interfaces/clients';

@Component({
  selector: 'app-cli-persona-fisica',
  templateUrl: './cli-persona-fisica.component.html',
})
export class CliPersonaFisicaComponent {
  @Input() clientForm: FormGroup;
  @Input() client: ClientModel;
}
