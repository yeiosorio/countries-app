import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  },
  {
    path: 'listado',
    loadChildren: () => import('./layout/main.routes').then(m => m.ROUTES)
  },
  {
    path: '**',
    redirectTo: 'listado'
  }
];
