import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService
{
  constructor(
    private router:Router
  ) { }

  redirectTo(url: string, data: any = [])
  {
    this.router.navigate( [url.toLocaleLowerCase() ], { state: data} );
  }
}
