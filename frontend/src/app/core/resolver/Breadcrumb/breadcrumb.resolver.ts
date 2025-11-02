import { ResolveFn } from '@angular/router';

export const breadcrumbResolver: ResolveFn<string> = (route, state) => {
  const action = route.paramMap.get('action');
  return action ?? '';
};
