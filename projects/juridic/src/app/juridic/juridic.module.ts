import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuridicComponent } from './juridic/juridic.component';
import { RouterModule } from '@angular/router';
import { JURIDIC_ROUTES } from './juridic.routes';

import { SharedLibModule } from 'shared-lib';
import { ExpedientsComponent } from './expedients/expedients.component';

@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(JURIDIC_ROUTES),
  ],
  declarations: [JuridicComponent, ExpedientsComponent],
})
export class JuridicModule {}
