import { PageSpecialtyComponent } from './pages/page-specialty/page-specialty.component';
import { Routes } from '@angular/router';
import { breadcrumbResolver } from '../../core/resolver/Breadcrumb/breadcrumb.resolver';
import { FormCityComponent } from './components/form-city/form-city.component';
import { PageCitiesComponent } from './pages/page-cities/page-cities.component';
import { PageClinicComponent } from './pages/page-clinic/page-clinic.component';
import { FormClinicComponent } from './components/form-clinic/form-clinic.component';
import { FormSpecialtyComponent } from './components/form-specialty/form-specialty.component';
import { PageProfessionalComponent } from './pages/page-professional/page-professional.component';
import { FormProfessionalComponent } from './components/form-professional/form-professional.component';
import { PageEmployeeComponent } from './pages/page-employee/page-employee.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';


export const managementRoutes: Routes = [
  {
    path: 'cidades',
    data: { breadcrumb: 'Cidades' },
    component: PageCitiesComponent,
  },
  {
    path: 'cidades/:action',
    component: FormCityComponent,
    data: { breadcrumb: 'Novo', parent: '/cadastros/cidades' },
  },
  {
    path: 'cidades/:action/:id',
    component: FormCityComponent,
    resolve: {breadcrumb: breadcrumbResolver},
    data: { breadcrumb: ':action', parent: '/cadastros/cidades' },
  },
  {
    path: 'clinicas',
    data: { breadcrumb: 'Clínicas' },
    component: PageClinicComponent,
  },
  {
    path: 'clinicas/:action',
    component: FormClinicComponent,
    data: { breadcrumb: 'Novo', parent: '/cadastros/clinicas' },
  },
  {
    path: 'clinicas/:action/:id',
    component: FormClinicComponent,
    resolve: {breadcrumb: breadcrumbResolver},
    data: { breadcrumb: ':action', parent: '/cadastros/clinicas' },
  },
  {
    path: 'especialidades',
    data: { breadcrumb: 'Especialidades' },
    component: PageSpecialtyComponent,
  },
  {
    path: 'especialidades/:action',
    component: FormSpecialtyComponent,
    data: { breadcrumb: 'Novo', parent: '/cadastros/especialidades' },
  },
  {
    path: 'especialidades/:action/:id',
    component: FormSpecialtyComponent,
    resolve: {breadcrumb: breadcrumbResolver},
    data: { breadcrumb: ':action', parent: '/cadastros/especialidades' },
  },
  {
    path: 'funcionarios',
    data: { breadcrumb: 'Funcionários' },
    component: PageEmployeeComponent,
  },
  {
    path: 'funcionarios/:action',
    component: FormEmployeeComponent,
    data: { breadcrumb: 'Novo', parent: '/cadastros/funcionarios' },
  },
  {
    path: 'funcionarios/:action/:id',
    component: FormEmployeeComponent,
    resolve: {breadcrumb: breadcrumbResolver},
    data: { breadcrumb: ':action', parent: '/cadastros/funcionarios' },
  },
  {
    path: 'profissionais',
    data: { breadcrumb: 'Profissionais' },
    component: PageProfessionalComponent,
  },
  {
    path: 'profissionais/:action',
    component: FormProfessionalComponent,
    data: { breadcrumb: 'Novo', parent: '/cadastros/profissionais' },
  },
  {
    path: 'profissionais/:action/:id',
    component: FormProfessionalComponent,
    resolve: {breadcrumb: breadcrumbResolver},
    data: { breadcrumb: ':action', parent: '/cadastros/profissionais' },
  },
];
