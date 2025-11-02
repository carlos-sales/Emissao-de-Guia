import { Component, HostListener } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ThemeService } from '../../../shared/services/theme/theme.service';
import { BreakpointService } from '../../../shared/services/breakpoint/breakpoint.service';
import { HeaderUserMenuComponent } from './header-user-menu/header-user-menu.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [AppMaterialModule, HeaderUserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent
{
  constructor(
    private serviceTheme: ThemeService,
    public serviceBreakpoint: BreakpointService
  )
  {
    this.serviceTheme.setTheme();
  }

  toggleTheme()
  {
    this.serviceTheme.toggleTheme();
  }

  get isDark(): boolean
  {
    return this.serviceTheme.isDarkTheme();
  }
}
