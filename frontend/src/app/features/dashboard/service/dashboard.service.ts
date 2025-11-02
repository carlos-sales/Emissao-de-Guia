import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ApiGateway } from './../../../gateway/ApiGateway/api-gateway';
import { Urls } from '../../../core/urls/urls';
import { DebugService } from '../../../shared/services/debug/debug.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService
{
  private readonly URL: Urls;
  private readonly API: string;
  private destroyRef = inject(DestroyRef);

  constructor(
    private serviceDebug: DebugService,
    public gatewayApi: ApiGateway
  )
  {
    this.URL = new Urls( this.serviceDebug );
    this.API = this.URL.get() + '/dashboard';
  }

  get(): any
  {
    return this.gatewayApi.get(this.API + '/get').pipe(takeUntilDestroyed(this.destroyRef)) ;
  }
}
