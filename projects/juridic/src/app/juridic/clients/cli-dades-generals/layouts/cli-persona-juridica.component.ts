import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientModel } from '../../../interfaces/clients';

@Component({
  selector: 'app-cli-persona-juridica',
  templateUrl: './cli-persona-juridica.component.html',
})
export class CliPersonaJuridicaComponent {
  @Input() clientForm: FormGroup;
  @Input() client: ClientModel;
}
