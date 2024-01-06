import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme: 'dark' | '' = 'dark';

  constructor() {}

  toggleTheme() {
    this._theme = this._theme === 'dark' ? '' : 'dark';
  }

  getTheme() {
    return this._theme;
  }
}
