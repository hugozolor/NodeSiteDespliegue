// notificaciones.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { NotificationItemComponent } from '../../components/notifications/notification-item/notification-item';
import { EmptyStateComponent } from '../../components/notifications/empty-state/empty-state';
import { HeaderComponent } from '../../components/header/header';
import { SessionService } from '../../core/services/session';
import { GuestBlockComponent } from '../../shared/components/guest-block/guest-block';

// --- NUEVAS IMPORTACIONES PARA MATERIAL UI Y FILTROS ---
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    NotificationItemComponent, 
    EmptyStateComponent, 
    GuestBlockComponent,
    // --- NUEVOS MODULOS ---
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css']
})
export class NotificacionesComponent implements OnInit {
  // AGREGADO: Inyectamos el servicio para detectar si es invitado
  public sessionService = inject(SessionService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  // Observable para reaccionar a cambios en tiempo real
  notifications$ = this.notificationService.notifications$;

  // --- NUEVA SECCIÓN: Lógica de Filtros ---
  selectedFilter: string | null = null;
  private filterSubject = new BehaviorSubject<string | null>(null);

  // Observable derivado que combina las notificaciones con el filtro activo
  filteredNotifications$: Observable<any[]> = combineLatest([
    this.notifications$,
    this.filterSubject
  ]).pipe(
    map(([notifications, filter]) => {
      if (!notifications) return [];
      if (!filter) return notifications;
      return notifications.filter((n: any) => n.type === filter);
    })
  );
  // -----------------------------------------

  ngOnInit(): void {
    // --- PREPARADO PARA BACKEND ---
    // Solo intentamos cargar si NO es invitado
    if (!this.sessionService.isGuest()) {
      this.notificationService.fetchNotifications();
    }
  }

  // Botón de regreso al menú principal (ajusta la ruta según tu app.routes.ts)
  goBack(): void {
    this.router.navigate(['/dashboard']); 
  }

  // --- NUEVA SECCIÓN: Método para actualizar el filtro ---
  setFilter(filter: string | null): void {
    this.selectedFilter = filter;
    this.filterSubject.next(filter);
  }
}