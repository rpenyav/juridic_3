import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';

import { SharedLibModule } from 'projects/shared-lib/src/public-api';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { GeneralHeaderComponent } from './layout/header/header-general.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [
    BrowserModule,

    SharedLibModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot({}, {}),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    GeneralHeaderComponent,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
