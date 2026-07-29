import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { routes } from './app.routes';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs); // Registra el español

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideBrowserGlobalErrorListeners(), // Se mantiene tu detector de errores
    provideRouter(routes),                 // Se mantienen tus rutas
    provideAnimations(),                   // Se mantienen tus animaciones
    provideHttpClient(),                    // AGREGADO: Necesario para los servicios de barrios y reseñas
    // --- REGISTRO DE ICONOS PARA QUE FUNCIONEN EN TODA LA APP ---
    importProvidersFrom(MatIconModule)
  ]
};