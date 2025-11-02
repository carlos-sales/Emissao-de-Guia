import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService
{
  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';

  setTheme()
  {
    if( this.isDarkTheme() )
    {
      this.enableDarkTheme();
      return;
    }
    const theme = localStorage.getItem('theme') || this.lightThemeClass;
    document.body.classList.toggle(theme);
  }

  enableDarkTheme()
  {
    document.body.classList.add(this.darkThemeClass);
    localStorage.setItem('theme', this.darkThemeClass);
  }

  disableDarkTheme()
  {
    document.body.classList.remove(this.darkThemeClass);
    localStorage.removeItem('theme');
  }

  toggleTheme()
  {
    document.body.classList.toggle(this.darkThemeClass);
    this.isDarkTheme() ? this.enableDarkTheme() : this.disableDarkTheme();
  }

  isDarkTheme(): boolean
  {
    return document.body.classList.contains(this.darkThemeClass);
  }
}
