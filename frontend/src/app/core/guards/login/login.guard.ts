import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) =>
{
  const router = new Router;
  const token = localStorage.getItem('token');
  if(token)
  {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
