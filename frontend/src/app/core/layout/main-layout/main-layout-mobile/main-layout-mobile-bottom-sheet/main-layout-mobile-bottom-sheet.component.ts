import { Component, Inject, inject } from '@angular/core';
import { AppMaterialModule } from '../../../../../shared/app-material/app-material.module';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Menu } from '../../../../interfaces/menu/menu';
import { RouteService } from '../../../../../shared/services/route/route.service';

@Component({
  selector: 'main-layout-mobile-bottom-sheet',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './main-layout-mobile-bottom-sheet.component.html',
  styleUrl: './main-layout-mobile-bottom-sheet.component.scss'
})
export class MainLayoutMobileBottomSheetComponent
{
  private _bottomSheetRef = inject<MatBottomSheetRef<MainLayoutMobileBottomSheetComponent>>(MatBottomSheetRef);
  public menu: Menu[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private serviceRoute: RouteService
  )
  {
    this.menu = data;
  }

  openLink(event: MouseEvent, route: string = ''): void
  {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.serviceRoute.redirectTo(route, {});
  }
}
