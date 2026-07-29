import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ThemeService } from '../../services/theme';
import { NotificationService } from '../../services/notification';
import { PublicationLimitService } from '../../services/publication-limit';
import { SessionService } from '../../core/services/session';
import { GuestBlockComponent } from '../../shared/components/guest-block/guest-block';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, GuestBlockComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  notificationService = inject(NotificationService);
  router = inject(Router); 
  public limitService = inject(PublicationLimitService);
  public sessionService = inject(SessionService);

  isSidebarOpen = false;
  isUserMenuOpen = false;
  showGuestBlock = false;

  userData = {
    username: 'Usuario_Nodesite',
    email: 'contacto@nodesite.com'
  };

  menuOptions = [
    { 
      label: 'Menú Principal', 
      // Material UI: 'Dashboard' (Panel administrativo refinado de bloques multitarea)
      icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' 
    },
    { 
      label: 'Mapa', 
      // Material UI: 'Map' (Plano tridimensional plegado con relieve interno)
      icon: 'M15 18.89l-6-2.11V5.11l6 2.22v11.56zM20.64 19.1L15 21l-6-2.11-5.34 2.08C3.15 21.03 3 20.85 3 20.62V5.5c0-.22.15-.4.36-.48L9 3l6 2.11 5.64-1.9c.21-.07.36.11.36.33v15.12c0 .23-.15.41-.36.44z' 
    },
    { 
      label: 'Publicar', 
      // Material UI: 'PostAdd' (Formulario formal de redacción de reportes con líneas de escritura y símbolo de adición)
      icon: 'M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22zM19 2h-2v3h-3v2h3v3h2V7h3V5h-3V2zM7 9h8v2H7zm0 4h8v2H7zm0 4h5v2H7z' 
    },
    { 
      label: 'Reseña', 
      // Material UI: 'RateReview' (Burbuja de diálogo con lápiz estilizado de calificación integrado)
      icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.42l5.88-5.88c.2-.2.51-.2.71 0l1.71 1.71c.2.2.2.51 0 .71L8.42 14H6zm12 0h-7.42l2-2H18v2z' 
    },
    { 
      label: 'Chat Bot', 
      // Material UI: 'SmartToy' (Robot asistente inteligente oficial de Google con antenas, ojos y panel de circuitos)
      icon: 'M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5 1.67 1.5 1.5-.67 1.5-1.5 1.5zm-6 3h6v2H9v-2z' 
    },
    { 
      label: 'Notificación', 
      // Material UI: 'NotificationsActive' (Campana dinámica con ondas laterales de alerta en tiempo real)
      icon: 'M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zM19.97 10.5h2c-.15-2.65-1.51-4.97-3.55-6.42l-1.43 1.43c2.4 1.83 3.98 4.65 4.12 7.69zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-6 11c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z' 
    },

// --- NUEVAS SECCIONES AGREGADAS ---
    {
      label: 'Aprendizaje',
      // Material UI: 'School' (Gorro de graduación clásico para representar educación/cursos de la Consigna 2)
      icon: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 14.72l5-2.45v3.72z'
    },
    {
      label: 'Blog',
      // Material UI: 'Article' (Documento formal con líneas de texto para artículos y novedades de la Consigna 3)
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
    },

        {
      label: 'cv',
      // Material UI: 'Article' (Documento formal con líneas de texto para artículos y novedades de la Consigna 3)
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
    },

    { 
      label: 'Configuración', 
      // Material UI: 'Settings' (Engranaje industrial de alta precisión con orificio central calibrado y dientes simétricos)
      icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'
    },
    { 
      label: 'nosotros', 
      // Material UI: 'Groups' (Estructura de equipo corporativo con tres siluetas jerárquicas y hombreras definidas)
      icon: 'M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm16 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V21h14v-2.5c0-2.33-4.67-3.5-7-3.5zM4 15c-.83 0-1.5 .67-1.5 1.5V19h5v-1.66c0-1.25.75-2.32 1.86-2.77C8.14 15.22 5.89 15 4 15zm16 0c-1.89 0-4.14.22-5.36.57 1.11.45 1.86 1.52 1.86 2.77V19h5v-2.5c0-.83-.67-1.5-1.5-1.5z' 
    },

        { 
      label: 'quienes-somos', 
      // Material UI: 'Groups' (Estructura de equipo corporativo con tres siluetas jerárquicas y hombreras definidas)
      icon: 'M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm16 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V21h14v-2.5c0-2.33-4.67-3.5-7-3.5zM4 15c-.83 0-1.5 .67-1.5 1.5V19h5v-1.66c0-1.25.75-2.32 1.86-2.77C8.14 15.22 5.89 15 4 15zm16 0c-1.89 0-4.14.22-5.36.57 1.11.45 1.86 1.52 1.86 2.77V19h5v-2.5c0-.83-.67-1.5-1.5-1.5z' 
    },

        {
      label: 'faq',
      // Material UI: 'Article' (Documento formal con líneas de texto para artículos y novedades de la Consigna 3)
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
    },
  ];

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }

  toggleUserMenu() { 
    if (this.sessionService.isGuest()) {
      this.showGuestBlock = true;
      this.isUserMenuOpen = false;
    } else {
      this.isUserMenuOpen = !this.isUserMenuOpen; 
    }
  }

  cerrarBloqueo() {
    this.showGuestBlock = false;
  }

  navegar(label: string) {
    this.isSidebarOpen = false;
    if (label === 'Menú Principal') this.router.navigate(['/dashboard']);
    if (label === 'Mapa') this.router.navigate(['/mapa']);
    if (label === 'Publicar') this.router.navigate(['/publicar']);
    if (label === 'Reseña') this.router.navigate(['/resenas']);
    if (label === 'Chat Bot') this.router.navigate(['/chatbot']);
    if (label === 'Notificación') this.router.navigate(['/notificaciones']);

if (label === 'Aprendizaje') this.router.navigate(['/centro-aprendizaje']);
    if (label === 'Blog') this.router.navigate(['/blog']);
    if (label === 'cv') this.router.navigate(['/cv']);
    if (label === 'quienes-somos') this.router.navigate(['/quienes-somos']);
    if (label === 'faq') this.router.navigate(['/faq']);

    if (label === 'Configuración') this.router.navigate(['/mi-cuenta']);
    if (label === 'nosotros') this.router.navigate(['/nosotros']);
  }
}