import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if(!token) return next(req);
  
  const cloned = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  });
  return next(cloned);
};
