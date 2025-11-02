import { Injectable } from '@angular/core';
import { Menu } from '../../../core/interfaces/menu/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService
{
  public menu: Menu[] = [];

  constructor()
  {
    this.set();
  }

  set()
  {
    this.menu = [
      {
        name: 'Cadastros',
        icon: 'folder_managed',
        children: [
          {
            name: 'Cidade',
            route: '/cadastros/cidades',
          },
          {
            name: 'Clínicas',
            route: '/cadastros/clinicas',
          },
          {
            name: 'Dependentes',
            route: '/cadastros/dependentes',
          },
          {
            name: 'Especialidades',
            route: '/cadastros/especialidades',
          },
          {
            name: 'Funcionários',
            route: '/cadastros/funcionarios',
          },
          {
            name: 'Profissionais',
            route: '/cadastros/profissionais',
          },
        ],
      },
      {
        name: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        name: 'Gestão de Guias',
        icon: 'local_hospital',
        children: [
          {
            name: 'Emitir Guia',
            route: '/gestao-de-guias/emitir'
          },
          {
            name: 'Listar',
            route: '/gestao-de-guias/lista'
          },
        ]
      },
      {
        name: 'Gestão do Sistema',
        icon: 'manage_accounts',
        children: [
          {
            name: 'Log de Eventos',
            route: '/gestao-do-sistema/log-de-eventos'
          },
          {
            name: 'Usuários',
            route: '/gestao-do-sistema/usuarios'
          },
        ]
      },
      {
        name: 'Relatórios',
        icon: 'article',
        children: [
          {
            name: 'Guias Emitidas',
            route: '/relatorios/guias-emitidas'
          },
        ]
      },
    ]
  }

  get()
  {
    return this.menu;
  }
}
