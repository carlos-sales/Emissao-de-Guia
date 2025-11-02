import { Component } from '@angular/core';

import { BreakpointService } from '../../../shared/services/breakpoint/breakpoint.service';
import { MainLayoutDesktopComponent } from './main-layout-desktop/main-layout-desktop.component';
import { MainLayoutMobileComponent } from './main-layout-mobile/main-layout-mobile.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [MainLayoutDesktopComponent, MainLayoutMobileComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent
{
  constructor(
    public serviceBreakpoint: BreakpointService
  ){}
}
