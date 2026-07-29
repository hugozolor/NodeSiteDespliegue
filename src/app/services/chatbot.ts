import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private http = inject(HttpClient);

  /**
   * NOTA PARA BACKEND:
   * El endpoint debe procesar el texto con el motor de IA (GPT/Gemini).
   * Se recomienda mantener un 'sessionId' para que la IA tenga memoria.
   */
  private readonly API_URL = 'api/v1/chatbot/chat';

  private _messages = new BehaviorSubject<Message[]>([]);
  public messages$ = this._messages.asObservable();

  // NUEVO: Controla si el bot está "pensando"
  private _isTyping = new BehaviorSubject<boolean>(false);
  public isTyping$ = this._isTyping.asObservable();

  // Cambiar a 'false' cuando el endpoint de IA esté activo
  private isDevMode = true;

  sendMessage(text: string): void {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    // 1. Mostrar mensaje del usuario en UI
    this._messages.next([...this._messages.value, userMsg]);

    // 2. Activar efecto "Escribiendo..."
    this._isTyping.next(true);

    if (this.isDevMode) {
      // Simulación de respuesta empática tras 2 segundos
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Entiendo cómo te sentís. Estoy acá para escucharte y ayudarte con cualquier duda de Nodesite. 🤍',
          sender: 'bot',
          timestamp: new Date(),
          type: 'emotional'
        };
        this._messages.next([...this._messages.value, botMsg]);
        
        // Desactivar efecto "Escribiendo..."
        this._isTyping.next(false);
      }, 2000);
    } else {
      // 3. CONEXIÓN REAL CON BACKEND (Comentado para futuro)
      /*
      this.http.post<Message>(this.API_URL, { prompt: text }).subscribe(res => {
        this._messages.next([...this._messages.value, res]);
        this._isTyping.next(false);
      });
      */
    }
  }

  clearHistory(): void {
    this._messages.next([]);
  }
}