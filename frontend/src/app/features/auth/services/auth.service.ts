import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoginGateway } from '../../../gateway/Login/login-gateway';
import { DialogService } from '../../../shared/services/dialog/dialog.service';
import { RouteService } from '../../../shared/services/route/route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private destroyRef = inject(DestroyRef);
  private loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isRecovery = new BehaviorSubject<boolean>(false);
  public isRecovery$ = this.isRecovery.asObservable();

  constructor(
    private gatewayLogin: LoginGateway,
    private serviceRoute: RouteService,
    private serviceDialog: DialogService,
  ) {}

  setRecovery(state: boolean)
  {
    this.isRecovery.next(state);
  }

  getIsRecovery(): Observable<boolean>
  {
    return this.isRecovery.asObservable();
  }

  doAuthenticate(request: any)
  {
    return this.gatewayLogin.authenticate(request).pipe(takeUntilDestroyed(this.destroyRef));
  }

  doRecovery(request: any)
  {
    return this.gatewayLogin.recovery(request).pipe(takeUntilDestroyed(this.destroyRef));
  }

  isLoggedIn(): boolean
  {
    return !!localStorage.getItem('token');
  }

  login(user: any, permitions: any, token: string)
  {
    localStorage.setItem('user', user);
    localStorage.setItem('permitions', permitions);
    localStorage.setItem('token', token);
    this.loggedIn$.next(true);
  }

  logout()
  {
    localStorage.removeItem('user');
    localStorage.removeItem('permitions');
    localStorage.removeItem('token');
    localStorage.removeItem('breadcrumbs');
    this.loggedIn$.next(false);
    this.serviceRoute.redirectTo('/login');
  }

  getLoginStatus(): Observable<boolean>
  {
    return this.loggedIn$.asObservable();
  }

  getUserName()
  {
    const storedUserData = localStorage.getItem('user');
    if(storedUserData)
    {
      const user = JSON.parse(storedUserData);
      return user.nome;
    }
    return '';
  }

  getUserId()
  {
    const storedUserData = localStorage.getItem('user');
    if(storedUserData)
    {
      const user = JSON.parse(storedUserData);
      return user.id;
    }
    return '';
  }

  sessionExpired()
  {
    this.serviceDialog.errorDialog("Sessão Expirada", "Por favor, faça login novamente.");
    this.logout();
  }
}
