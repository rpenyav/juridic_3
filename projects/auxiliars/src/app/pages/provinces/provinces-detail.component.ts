import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Province } from 'src/app/interfaces/provinces';
import { ProvincesTypeService } from './provinces.service';

@Component({
  selector: 'app-provinces-detail',
  templateUrl: './provinces-detail.component.html',
  styleUrls: ['./provinces-detail.component.scss'],
})
export class ProvincesDetailComponent implements OnInit {
  id: string | null = null;
  provinceDetail: Province | null = null;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private provincesTypeService: ProvincesTypeService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadProvinceDetail();
  }

  loadProvinceDetail(): void {
    const idNum = Number(this.id);
    if (!isNaN(idNum)) {
      this.provincesTypeService.getProvinceTypeById(idNum).subscribe({
        next: (province: Province | null) => {
          this.provinceDetail = province;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(
            'Error al recuperar el detalle de la provincia:',
            error
          );
          this.loading = false;
        },
        complete: () => {
          console.log('data loaded');
        },
      });
    } else {
      this.loading = false;
    }
  }
}
