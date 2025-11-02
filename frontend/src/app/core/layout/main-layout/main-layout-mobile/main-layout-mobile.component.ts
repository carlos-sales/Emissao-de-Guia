import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { MenuService } from '../../../../shared/services/menu/menu.service';
import { RouteService } from '../../../../shared/services/route/route.service';
import { Menu } from '../../../interfaces/menu/menu';
import { HeaderComponent } from '../../header/header.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MainLayoutMobileBottomSheetComponent } from './main-layout-mobile-bottom-sheet/main-layout-mobile-bottom-sheet.component';

@Component({
  selector: 'main-layout-mobile',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, BreadcrumbComponent, AppMaterialModule],
  templateUrl: './main-layout-mobile.component.html',
  styleUrl: './main-layout-mobile.component.scss'
})
export class MainLayoutMobileComponent
{
  public menu: Menu[] = [];
  private _bottomSheet = inject(MatBottomSheet);

  constructor(public serviceMenu: MenuService,
              public serviceRoute: RouteService)
  {
    this.menu = this.serviceMenu.get();
  }

  redirectTo(route: string = '')
  {
    this.serviceRoute.redirectTo(route, {});
  }

  openBottomSheet(menu: Menu[])
  {
    this._bottomSheet.open(MainLayoutMobileBottomSheetComponent, {data: menu});
  }
}
