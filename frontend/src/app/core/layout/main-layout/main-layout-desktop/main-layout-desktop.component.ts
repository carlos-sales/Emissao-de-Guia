import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { MenuService } from '../../../../shared/services/menu/menu.service';
import { Menu } from '../../../interfaces/menu/menu';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'main-layout-desktop',
  standalone: true,
  imports: [RouterOutlet, RouterModule, BreadcrumbComponent, AppMaterialModule, HeaderComponent],
  templateUrl: './main-layout-desktop.component.html',
  styleUrl: './main-layout-desktop.component.scss'
})
export class MainLayoutDesktopComponent
{
  public menu: Menu[] = [];
  childrenAccessor = (node: Menu) => node.children ?? [];
  hasChild = (_: number, node: Menu) => !!node.children && node.children.length > 0;

  constructor(
    public serviceMenu: MenuService
  ) {}

  ngOnInit()
  {
    this.initMenu();
  }

  initMenu()
  {
    this.menu = this.serviceMenu.get();
  }
}
