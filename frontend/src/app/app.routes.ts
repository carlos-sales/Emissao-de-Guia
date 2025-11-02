import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth/auth.guard';
import { loginGuard } from './core/guards/login/login.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthPageComponent } from './features/auth/pages/auth-page/auth-page.component';
import { PageDashboardComponent } from './features/dashboard/pages/page-dashboard/page-dashboard.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: AuthPageComponent, 
    canActivate: [loginGuard]
  },
  {
    path: '',
    component: MainLayoutComponent, 
    data: { breadcrumb: 'Home' },
    canActivate: [authGuard],
    children:
    [
      { path: 'home', component: HomePageComponent, data: {breadcrumb: 'Home'} },
      { path: 'dashboard', component: PageDashboardComponent, data: {breadcrumb: 'Dashboard'} },
      { path: '', component: PageDashboardComponent, data: {breadcrumb: 'Dashboard'} },
      {
        path: 'cadastros',
        data: {breadcrumb: 'Cadastros'},
        loadChildren: () => import('./features/management/management.routes').then(m => m.managementRoutes)
      }
    ]
  },
];
