import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

import { Clinic } from '../../../../core/interfaces/clinic/clinic';
import { Company } from '../../../../core/interfaces/company/company';
import { Urls } from '../../../../core/urls/urls';
import { ApiGateway } from '../../../../gateway/ApiGateway/api-gateway';
import { DebugService } from '../../../../shared/services/debug/debug.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService
{
  private cache$?: Observable<Clinic[]>;
  private readonly URL: Urls;
  private readonly API: string;

  constructor(
    private serviceDebug: DebugService,
    public gatewayApi: ApiGateway
  )
  {
    this.URL = new Urls( this.serviceDebug );
    this.API = this.URL.get() + '/company';
  }

  private clearCache()
  {
    this.cache$ = undefined;
  }

  getAll(): any
  {
    if(!this.cache$)
    {
      this.cache$ = this.gatewayApi.get(this.API + '/get').pipe(shareReplay(1)) ;
    }
    return this.cache$;
  }

  getWithParams(params: any)
  {
    if(!this.cache$)
    {
      this.cache$ = this.gatewayApi.getWithParams(this.API + '/get', params).pipe(shareReplay(1)) ;
    }
    return this.cache$;
  }

  getById(id: number): any
  {
    return this.gatewayApi.getById(this.API + '/get-by-id', id).pipe();
  }

  update(params: Company): any
  {
    return this.gatewayApi.update(this.API + '/update', params).pipe(tap(() => this.clearCache()));
  }

  updateStatus(active: boolean, id: number)
  {
    return this.gatewayApi.updateStatus(this.API + '/update-status', active, id).pipe(tap(() => this.clearCache())) ;
  }

  insert(params: Company)
  {
    return this.gatewayApi.insert(this.API + '/insert', params).pipe(tap(() => this.clearCache())) ;
  }
}
