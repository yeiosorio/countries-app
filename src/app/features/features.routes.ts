import { Routes } from '@angular/router';

export const FEATURES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./listado/components/listado.component')
      .then(m => m.ListadoComponent)
  },
  {
    path: 'country/:id',
    loadComponent: () => import('./detalle/components/detalle.component')
      .then(m => m.DetalleComponent)
  },
  {
    path: 'administracion',
    loadComponent: () => import('./administracion/components/administracion.component')
      .then(m => m.AdministracionComponent)
  }
]; 