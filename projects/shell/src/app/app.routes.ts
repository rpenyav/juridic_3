import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { canActivate } from './auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:3002/remoteEntry.js',

        // remoteEntry:
        //   'http://juridic3demo.cronda.coop:8001/authentication/remoteEntry.js',

        remoteName: 'authentication',
        exposedModule: './AuthModule',
      }).then((m) => m.AuthModule),
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'juridic',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'juridic',
        exposedModule: './JuridicModule',
      }).then((m) => m.JuridicModule),
    canActivate: [canActivate],
  },
  {
    path: 'auxiliars',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'auxiliars',
        exposedModule: './AuxiliarsModule',
      }).then((m) => m.AuxiliarsModule),
    canActivate: [canActivate],
  },

  // {
  //   path: 'react',
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'script',
  //     remoteEntry:
  //       'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
  //     remoteName: 'react',
  //     exposedModule: './web-components',
  //     elementName: 'react-element',
  //   } as WebComponentWrapperOptions,
  // },

  {
    path: '**',
    component: NotFoundComponent,
  },

  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
