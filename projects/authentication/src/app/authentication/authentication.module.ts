import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './authentication/authentication.component';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './authentication.routes';
import { SharedLibModule } from 'shared-lib';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedLibModule,
    RouterModule.forChild(AUTH_ROUTES),
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
