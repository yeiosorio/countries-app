import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { ListadoComponent } from '../features/listado/components/listado.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../features/features.routes').then(m => m.FEATURES_ROUTES)  
      }
    ]
  }
];
