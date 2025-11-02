import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService
{
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly layoutChanges = toSignal(
    this.breakpointObserver
      .observe(Object.values(Breakpoints))
      .pipe(map(({ breakpoints }) => breakpoints)),
  );

  public readonly isWeb = computed(
    () => this.layoutChanges()?.[Breakpoints.Web] ?? false,
  );

  public readonly isWebPortrait = computed(
    () => this.layoutChanges()?.[Breakpoints.WebPortrait] ?? false,
  );

  public readonly isWebLandscape = computed(
    () => this.layoutChanges()?.[Breakpoints.WebLandscape] ?? false,
  );

  public readonly isHandset = computed(
    () => this.layoutChanges()?.[Breakpoints.Handset] ?? false,
  );

  public readonly isHandsetPortrait = computed(
    () => this.layoutChanges()?.[Breakpoints.HandsetPortrait] ?? false,
  );

  public readonly isHandsetLandscape = computed(
    () => this.layoutChanges()?.[Breakpoints.HandsetLandscape] ?? false,
  );

  public readonly isTablet = computed(
    () => this.layoutChanges()?.[Breakpoints.Tablet] ?? false,
  );

  public readonly isTabletPortrait = computed(
    () => this.layoutChanges()?.[Breakpoints.TabletPortrait] ?? false,
  );

  public readonly isTabletLandscape = computed(
    () => this.layoutChanges()?.[Breakpoints.TabletLandscape] ?? false,
  );

  public readonly isXSmall = computed(
    () => this.layoutChanges()?.[Breakpoints.XSmall] ?? false,
  );

  public readonly isSmall = computed(
    () => this.layoutChanges()?.[Breakpoints.Small] ?? false,
  );

  public readonly isMedium = computed(
    () => this.layoutChanges()?.[Breakpoints.Medium] ?? false,
  );

  public readonly isLarge = computed(
    () => this.layoutChanges()?.[Breakpoints.Large] ?? false,
  );

  public readonly isXLarge = computed(
    () => this.layoutChanges()?.[Breakpoints.XLarge] ?? false,
  );

  public readonly isMobileDevice = computed(
    () => this.isXSmall() || this.isSmall() || this.isMedium()
  );

  public readonly isTabletDevice = computed(
    () => this.isTablet()
  );

  public readonly isDesktopDevice = computed(
    () => this.isLarge() || this.isXLarge()
  );
}
