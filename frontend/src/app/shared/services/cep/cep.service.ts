import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ApiGateway } from '../../../gateway/ApiGateway/api-gateway';

@Injectable({
  providedIn: 'root'
})
export class CepService
{
  private cache$?: Observable<any[]>;
  private readonly API: string;

  constructor(
    public gatewayApi: ApiGateway
  )
  {
    this.API = 'https://viacep.com.br/ws/#/json/';
  }

  private clearCache()
  {
    this.cache$ = undefined;
  }

  get(cep: string): any
  {
    return this.gatewayApi.get(this.API.replace('#',cep)).pipe();
  }
}
