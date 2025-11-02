import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebugService
{
  constructor() { }

  isDebug(): boolean
  {
    return isDevMode();
  }
}
