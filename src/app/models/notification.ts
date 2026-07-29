/**
 * Tipos de alerta oficiales de Nodesite.
 * Ayuda al frontend a decidir qué icono o color mostrar.
 */
export type NotificationType = 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';

export interface Notification {
  id: string;               // ID único (UUID recomendado para el Backend)
  userId: string;           // ID del usuario que recibe la notificación
  title: string;            // Título corto (ej: "Aviso de publicación")
  message: string;          // Cuerpo del mensaje administrativo
  createdAt: Date;          // Fecha y hora de envío
  isRead: boolean;          // Estado para el punto de "no leído"
  type: NotificationType;   // Categoría del mensaje
  
  /** * Campo opcional para vincular a una entidad existente.
   * Si el admin advierte sobre una foto, aquí iría el ID del Pin.
   */
  relatedEntityId?: string; 
}