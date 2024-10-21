import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/page/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
];
