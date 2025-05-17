import { Routes } from '@angular/router';
import { ListadoComponent } from './listado/components/listado.component';
import { AdministracionComponent } from './administracion/components/administracion.component';
import { DetallePaisComponent } from './detalle-pais/components/detalle-pais.component';

export const FEATURES_ROUTES: Routes = [
  {
    path: '',
    component: ListadoComponent
  },
  {
    path: 'detalle-pais/:id',
    component: DetallePaisComponent
  },
  {
    path: 'administracion',
    component: AdministracionComponent
  },
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  }
]; 