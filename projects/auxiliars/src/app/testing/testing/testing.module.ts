import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    RouterTestingModule,
    MatSidenavModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
    }),
  ],
  exports: [
    HttpClientTestingModule,
    RouterTestingModule,
    MatSidenavModule,
    TranslateModule,
    MatIconModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
})
export class TestingModule {}
