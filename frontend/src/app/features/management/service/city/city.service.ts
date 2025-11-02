import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

import { City } from '../../../../core/interfaces/city/city';
import { Urls } from '../../../../core/urls/urls';
import { ApiGateway } from '../../../../gateway/ApiGateway/api-gateway';
import { DebugService } from '../../../../shared/services/debug/debug.service';

@Injectable({
  providedIn: 'root'
})
export class CityService
{
  private cache$?: Observable<City[]>;
  private readonly URL: Urls;
  private readonly API: string;

  constructor(
    private serviceDebug: DebugService,
    public gatewayApi: ApiGateway
  )
  {
    this.URL = new Urls( this.serviceDebug );
    this.API = this.URL.get() + '/city';
  }

  private clearCache()
  {
    this.cache$ = undefined;
  }

  getAll(): any
  {
    if(!this.cache$)
    {
      this.cache$ = this.gatewayApi.get(this.API + '/get').pipe(shareReplay(1));
    }
    return this.cache$;
  }

  getById(id: number): any
  {
    return this.gatewayApi.getById(this.API + '/get-by-id', id).pipe();
  }

  update(params: City): any
  {
    return this.gatewayApi.update(this.API + '/update', params).pipe(tap(() => this.clearCache()));
  }

  updateStatus(active: boolean, id: number)
  {
    return this.gatewayApi.updateStatus(this.API + '/update-status', active, id).pipe(tap(() => this.clearCache())) ;
  }

  insert(params: City)
  {
    return this.gatewayApi.insert(this.API + '/insert', params).pipe(tap(() => this.clearCache())) ;
  }
}
