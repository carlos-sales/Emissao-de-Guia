import { Breadcrumb } from './../../../core/interfaces/breadcrump/breadcrumb';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService
{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute)
  {
    this.router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[]
  {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children)
    {
      const routeSnapshot = child.snapshot;
      const hasComponent = !!routeSnapshot.routeConfig?.component;

      if (child.snapshot.data['parent'])
      {
        for (const parent of this.router.config)
        {
          const parentRoute = parent.children?.find(r => `/${r.path}` === child.snapshot.data['parent']);
          if(parentRoute) breadcrumbs.push({ label: parentRoute?.data?.['breadcrumb'], url: child.snapshot.data['parent'], clickable: hasComponent });
        }
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') url += `/${routeURL}`;

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url, clickable: hasComponent });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
