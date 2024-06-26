import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { RouterModule } from '@angular/router';
import { FLIGHTS_ROUTES } from './flights.routes';

import { SharedLibModule } from 'shared-lib';

@NgModule({
  imports: [
    CommonModule,

    SharedLibModule,
    RouterModule.forChild(FLIGHTS_ROUTES),
  ],
  declarations: [FlightsSearchComponent],
})
export class FlightsModule {}
