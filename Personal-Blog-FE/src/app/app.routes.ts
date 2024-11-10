import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'blogs',
    pathMatch: 'full',
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/home/page/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'blogs/:id',
    loadComponent: () =>
      import('./pages/home/page/single-blog/single-blog.component').then(
        (m) => m.SingleBlogComponent
      ),
  },
];
