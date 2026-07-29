import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Signals de Angular para manejar el estado en tiempo real
  isSidebarCollapsed = signal<boolean>(false);
  isDarkMode = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update(state => !state);
  }

  toggleTheme() {
    this.isDarkMode.update(state => !state);
    this.applyTheme();
  }

  private applyTheme() {
    const host = document.documentElement;
    if (this.isDarkMode()) {
      host.classList.add('dark-theme');
      host.classList.remove('light-theme');
    } else {
      host.classList.add('light-theme');
      host.classList.remove('dark-theme');
    }
  }
}