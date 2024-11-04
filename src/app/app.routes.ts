import {Routes} from '@angular/router';
import {registerRoutes} from './auth/auth.routes';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => registerRoutes,
  },
];
