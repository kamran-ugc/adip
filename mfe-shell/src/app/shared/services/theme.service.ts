import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'adip-theme';
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);

  public currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  /**
   * Set the application theme
   * @param theme - The theme to apply ('light', 'dark', or 'auto')
   */
  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  /**
   * Get the current theme setting
   */
  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  /**
   * Check if dark mode is currently active
   */
  isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    if (currentTheme === 'auto') {
      // If auto, switch to opposite of current system preference
      const prefersDark = this.getSystemPreference();
      this.setTheme(prefersDark ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const initialTheme = savedTheme || 'auto';
    this.applyTheme(initialTheme);
    this.currentThemeSubject.next(initialTheme);
  }

  /**
   * Apply the theme to the document
   */
  private applyTheme(theme: Theme): void {
    const isDark = this.resolveTheme(theme);
    this.isDarkModeSubject.next(isDark);
    
    // Update CSS custom properties based on theme
    this.updateCSSCustomProperties(isDark);
    
    // Update document classes
    document.documentElement.classList.toggle('dark-theme', isDark);
    document.documentElement.classList.toggle('light-theme', !isDark);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(isDark);
  }

  /**
   * Resolve theme preference to boolean (true = dark, false = light)
   */
  private resolveTheme(theme: Theme): boolean {
    switch (theme) {
      case 'dark':
        return true;
      case 'light':
        return false;
      case 'auto':
        return this.getSystemPreference();
      default:
        return false;
    }
  }

  /**
   * Get system dark mode preference
   */
  private getSystemPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Listen for system theme changes
   */
  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only respond to system changes if theme is set to 'auto'
      if (this.getCurrentTheme() === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  /**
   * Update CSS custom properties for the current theme
   */
  private updateCSSCustomProperties(isDark: boolean): void {
    const root = document.documentElement;
    
    if (isDark) {
      // Apply dark theme variables - ChatGPT-style neutral grays
      root.style.setProperty('--primary', '#4d75ff');
      root.style.setProperty('--primary-dark', '#3361ff');
      root.style.setProperty('--primary-5p', 'rgba(77, 117, 255, 0.05)');
      
      // Gray scale for dark theme - neutral grays without blue tint
      root.style.setProperty('--gray-10', '#ffffff');
      root.style.setProperty('--gray-50', '#f7f7f8');
      root.style.setProperty('--gray-60', '#ececf1');
      root.style.setProperty('--gray-70', '#9b9b9f');
      root.style.setProperty('--gray-80', '#6e6e80');
      root.style.setProperty('--gray-90', '#4a4a55');
      root.style.setProperty('--gray-94', '#40414f');
      root.style.setProperty('--gray-98', '#2d2d30');
      root.style.setProperty('--gray-100', '#212121');
      
      // Background colors for dark theme - neutral backgrounds
      root.style.setProperty('--white-bg', '#171717');
      root.style.setProperty('--gray-99-bg', '#1a1a1a');
      root.style.setProperty('--gray-98-bg', '#1e1e1e');
      root.style.setProperty('--gray-97-bg', '#262626');
      root.style.setProperty('--gray-96-bg', '#2d2d30');
      root.style.setProperty('--gray-95-bg', '#343541');
      
      // Success, warning, error colors for dark theme
      root.style.setProperty('--success', '#4caf50');
      root.style.setProperty('--warning', '#ff9800');
      root.style.setProperty('--error', '#f44336');
      
      // Body background
      document.body.style.background = '#171717';
      
    } else {
      // Apply light theme variables
      root.style.setProperty('--primary', '#3361ff');
      root.style.setProperty('--primary-dark', '#0039ff');
      root.style.setProperty('--primary-5p', 'rgba(51, 97, 255, 0.05)');
      
      // Gray scale for light theme
      root.style.setProperty('--gray-10', '#0d111a');
      root.style.setProperty('--gray-50', '#f9f9f9');
      root.style.setProperty('--gray-60', '#8c99b3');
      root.style.setProperty('--gray-70', '#8c99b3');
      root.style.setProperty('--gray-80', '#adbccc');
      root.style.setProperty('--gray-90', '#dde0e6');
      root.style.setProperty('--gray-94', '#ebecf0');
      root.style.setProperty('--gray-98', '#f7f8fa');
      root.style.setProperty('--gray-100', '#ffffff');
      
      // Background colors for light theme
      root.style.setProperty('--white-bg', '#ffffff');
      root.style.setProperty('--gray-99-bg', '#fafbfc');
      root.style.setProperty('--gray-98-bg', '#f7f8fa');
      root.style.setProperty('--gray-97-bg', '#f7f8fa');
      root.style.setProperty('--gray-96-bg', '#f2f3f5');
      root.style.setProperty('--gray-95-bg', '#edeff2');
      
      // Success, warning, error colors for light theme
      root.style.setProperty('--success', '#4caf50');
      root.style.setProperty('--warning', '#ff9800');
      root.style.setProperty('--error', '#f44336');
      
      // Body background
      document.body.style.background = '#f6f6f6';
    }
  }

  /**
   * Update meta theme-color for mobile browsers
   */
  private updateMetaThemeColor(isDark: boolean): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = isDark ? '#0d0e0f' : '#ffffff';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }
}