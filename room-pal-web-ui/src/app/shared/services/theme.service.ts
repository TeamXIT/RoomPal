import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _currentTheme = new BehaviorSubject('light')

  getTheme(): Observable<string> {
    return this._currentTheme.asObservable()
  }

  applyLightTheme() {
    this._applyTheme('light')
  }
  applyDarkTheme() {
    this._applyTheme('dark')
  }

  defaultTheme() {
    this._applyTheme('auto')
  }

  private _applyTheme(theme: ThemeType) {
    this._currentTheme.next(theme)
    if (theme === 'auto')
      theme = window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light'
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

type ThemeType = 'light' | 'dark' | 'auto'
