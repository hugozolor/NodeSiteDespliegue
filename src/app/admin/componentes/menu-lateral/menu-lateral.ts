import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutenticacionAdminService } from '../../servicios/autenticacion-admin';
import { LayoutService } from '../../servicios/layout.service';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule],
  templateUrl: './menu-lateral.html',
  styleUrls: ['./menu-lateral.css']
})
export class MenuLateralComponent {
  // Inyección de servicios moderna (Angular 16+)
  public layoutState = inject(LayoutService);
  private authService = inject(AutenticacionAdminService);
  private router = inject(Router);

  // Estructura limpia, semántica y ultra escalable para NODESITE
  public menuStructure: MenuSection[] = [
    {
      category: '',
      items: [
        { title: 'Panel de Control', route: '/admin/tablero-control', icon: 'dashboard_customize' }
      ]
    },
    {
      category: 'GESTIÓN CENTRAL',
      items: [
        { title: 'Gestión de Usuarios', route: '/admin/usuarios', icon: 'manage_accounts' },
        { title: 'Centro de Publicaciones', route: '/admin/publicaciones', icon: 'feed' },
        { title: 'Centro de Reseñas', route: '/admin/gestion-resenas', icon: 'rate_review' },
        { title: 'Gestión de Obras', route: '/admin/gestion-mapa', icon: 'engineering' }
      ]
    },
    {
      category: 'GEOLOCALIZACIÓN',
      items: [
        { title: 'Pines Institucionales', route: '/admin/pines-admin', icon: 'place' },
        { title: 'Pines Comunitarios', route: '/admin/pines-usuarios', icon: 'location_on' }
      ]
    },
    {
      category: 'CONTROL Y SOPORTE',
      items: [
        { title: 'Centro de Moderación', route: '/admin/advertencias', icon: 'gavel' },
        { title: 'Centro de Noticias', route: '/admin/notificaciones', icon: 'newspaper' },
        { title: 'Gestión Operativa', route: '/admin/gestion-operativa', icon: 'assignment' }
      ]
    }
  ];

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}