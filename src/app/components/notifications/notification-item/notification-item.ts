import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../models/notification';

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css'
})
export class NotificationItemComponent {
  // El decorador @Input permite recibir la notificación desde el padre
  @Input() notification!: Notification;
}