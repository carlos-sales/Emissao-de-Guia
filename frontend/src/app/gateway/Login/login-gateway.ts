import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, of } from 'rxjs';

import { Urls } from '../../core/urls/urls';
import { DebugService } from '../../shared/services/debug/debug.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGateway
{
  private readonly URL: Urls;
  private readonly API: string;

  constructor( private serviceDebug: DebugService,
               private httpClient: HttpClient )
  {
    this.URL = new Urls( this.serviceDebug );
    this.API = this.URL.get() + '/login';
  }

  authenticate(request: any)
  {
    return this.httpClient
      .post<any>( this.API + '/authenticate', request )
      .pipe( 
        catchError(err =>
          {
            console.error('Something get wrong', err);
            return of([]);
          }
        ),
        first()
      );
  }

  recovery(request: any)
  {
    return this.httpClient
      .post<any>( this.API + '/auth-recovery', request )
      .pipe( 
        catchError(err =>
          {
            console.error('Something get wrong', err);
            return of([]);
          }
        ),
        first()
      );
  }
}
