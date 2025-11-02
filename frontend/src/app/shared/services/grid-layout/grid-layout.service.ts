import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { GridConfig } from '../../../core/interfaces/grid/grid-config';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService
{
  gridConfig$: Observable<GridConfig>;

  constructor(private breakpointObserver: BreakpointObserver)
  {
    this.gridConfig$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(result =>
      {
        if(result.breakpoints[Breakpoints.XSmall]) return { cols: 1, colWidth: '100%' };
        if(result.breakpoints[Breakpoints.Small]) return { cols: 2, colWidth: '50%' };
        if(result.breakpoints[Breakpoints.Medium]) return { cols: 3, colWidth: '33.33%' };
        if(result.breakpoints[Breakpoints.Large]) return { cols: 4, colWidth: '25%' };
        return { cols: 6, colWidth: '16.66%' };
      }),
      shareReplay(1)
    );
  }
}
