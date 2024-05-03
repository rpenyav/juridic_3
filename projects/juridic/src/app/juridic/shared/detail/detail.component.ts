import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpedienteModel } from '../../interfaces/expedientes';
import { ClientModel } from '../../interfaces/clients';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent<T extends ExpedienteModel | ClientModel>
  implements OnInit
{
  tabId: string;
  private routeSub: Subscription;
  @Input() type: string;
  @Input() section: string;
  @Input() endpoint: string;
  @Input() data: T;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService<T>
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tabId = params['tabId'];
      this.loadData(this.tabId);
      console.log('this.tabId', this.tabId);
      console.log('data', this.data);
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadData(id: string) {
    this.loading = true; // Mostrar spinner loader mientras se cargan los datos
    this.generalService.getDataById(`${this.endpoint}/${id}`).subscribe(
      (response) => {
        if (response) {
          this.data = response;
        }
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      },
      () => {
        this.loading = false; // Ocultar spinner loader cuando los datos se han cargado
      }
    );
  }
}
