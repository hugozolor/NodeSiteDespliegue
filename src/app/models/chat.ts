export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot'; // 'user' para el cliente, 'bot' para la IA
  timestamp: Date;
  /**
   * TIP PARA BACKEND:
   * Pueden agregar un campo 'intent' para clasificar si el mensaje
   * fue una duda técnica o una consulta emocional.
   */
  type?: 'emotional' | 'technical' | 'general';
}