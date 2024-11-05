import {Routes} from '@angular/router';
import {loginRoutes, registerRoutes} from './auth/auth.routes';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => registerRoutes,
  },
  {
    path: 'login',
    loadChildren: () => loginRoutes,
  },
];
