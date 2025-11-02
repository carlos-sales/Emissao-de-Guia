import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';
import { IdleService } from './shared/services/idle/idle.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent
{
  title = 'Emissão de Guia Médica';

  constructor(
    private serviceAuth: AuthService,
    private serviceIdle: IdleService
  ) {}

  ngOnInit()
  {
    // this.serviceAuth.logout();
    this.serviceAuth.getLoginStatus().subscribe(
      isLogged => 
      {
        if(isLogged)
        {
          this.serviceIdle.startWatching();
          return
        }
        this.serviceIdle.stopWatching();
      }
    );
  }
}
