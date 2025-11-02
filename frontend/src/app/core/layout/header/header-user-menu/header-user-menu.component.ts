import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'header-user-menu',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './header-user-menu.component.html',
  styleUrl: './header-user-menu.component.scss'
})
export class HeaderUserMenuComponent
{
  public username: string = '';

  constructor(
    private serviceAuth: AuthService
  ) 
  {
    this.username = this.serviceAuth.getUserName();
  }

  doLogout()
  {
    this.serviceAuth.logout();
  }
}
