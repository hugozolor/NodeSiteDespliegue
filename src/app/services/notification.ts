import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);

  /**
   * NOTA PARA BACKEND:
   * URL base sugerida: api/v1/notifications
   * Se requiere que el JWT sea enviado en los headers para identificar al usuario.
   */
  private readonly API_URL = 'api/v1/notifications';

  // Fuente de verdad de las notificaciones
  private _notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this._notifications.asObservable();

  /**
   * Lógica para el BADGE (Círculo Rojo):
   * Filtra las notificaciones no leídas y emite el número total.
   */
  public unreadCount$ = this.notifications$.pipe(
    map(list => list.filter(n => !n.isRead).length)
  );

  // Switch para desarrollo (true = usa mockData / false = usa API real)
  private isDevMode = true;

  constructor() {
    this.fetchNotifications();
  }

  /**
   * MÉTODO: GET /notifications
   * OBJETIVO: Cargar mensajes oficiales del usuario logueado.
   */
  fetchNotifications(): void {
    if (this.isDevMode) {
      this._notifications.next(this.mockData); //
    } else {
      this.http.get<Notification[]>(this.API_URL).subscribe({
        next: (data) => this._notifications.next(data),
        error: (err) => console.error('Error al conectar con el servidor de notificaciones', err)
      });
    }
  }

  /**
   * MÉTODO: PATCH /notifications/:id/read
   * OBJETIVO: Cambiar estado a leido en DB y actualizar UI instantáneamente.
   */
  markAsRead(id: string): void {
    // Actualización optimista en la UI
    const current = this._notifications.value.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    this._notifications.next(current);

    if (!this.isDevMode) {
      this.http.patch(`${this.API_URL}/${id}/read`, {}).subscribe();
    }
  }

  /**
   * ESTRUCTURA PARA EL EQUIPO ADMINISTRATIVO:
   * Cuando un Admin envíe una notificación desde el panel, el JSON debe ser:
   * {
   * "userId": "uuid-del-usuario",
   * "title": "Título del aviso",
   * "message": "Cuerpo del mensaje",
   * "type": "INFO" | "SUCCESS" | "WARNING" | "ALERT",
   * "createdAt": "ISO-Date",
   * "isRead": false
   * }
   */

  /** * BLOQUE DE EJEMPLO / ELIMINAR AL CONECTAR BACKEND 
   * NOTA PARA ADMIN: Los tipos permitidos son INFO, SUCCESS, WARNING, ALERT
   */
  private mockData: Notification[] = [
    {
      id: '1',
      userId: 'user123',
      title: '¡Bienvenido a Nodesite!',
      message: 'Gracias por sumarte a nuestra comunidad. Este es el canal oficial administrativo.',
      createdAt: new Date(),
      isRead: false,
      type: 'INFO'
    },
    {
      id: '2',
      userId: 'user123',
      title: 'Aviso sobre tu publicación',
      message: 'Tu reporte en la zona centro ha sido verificado por el equipo de seguridad.',
      createdAt: new Date(Date.now() - 3600000),
      isRead: false,
      type: 'SUCCESS'
    },
    {
      id: '3',
      userId: 'user123',
      title: 'Advertencia de Contenido',
      message: 'Recuerda que las fotos de los reportes deben ser claras y sin contenido ofensivo.',
      createdAt: new Date(Date.now() - 86400000),
      isRead: true,
      type: 'WARNING'
    }
  ];
}