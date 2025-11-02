import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, startWith, Subscription, switchMapTo, timer } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdleService
{
  private userEvents$: Subscription | null = null;
  private idleTimeout = (60 * 1000) * 20; // 20 minutos de inatividade

  constructor(
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  startWatching()
  {
    if (this.userEvents$) return;

    this.ngZone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')
      );
      this.userEvents$ = activityEvents$
        .pipe(
          startWith(null),
          switchMapTo(timer(this.idleTimeout))
        )
        .subscribe(() => {
          this.ngZone.run(() => this.authService.logout());
        });
    });
  }

  stopWatching()
  {
    this.userEvents$?.unsubscribe();
    this.userEvents$ = null;
  }
}
