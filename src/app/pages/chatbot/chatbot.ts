import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { ChatbotService } from '../../services/chatbot';
import { SessionService } from '../../core/services/session'; // AGREGADO: Importar sesión
import { GuestBlockComponent } from '../../shared/components/guest-block/guest-block'; // AGREGADO: Importar bloqueo

@Component({
  selector: 'app-chatbot',
  standalone: true,
  // AGREGADO: GuestBlockComponent a la lista de imports
  imports: [CommonModule, FormsModule, HeaderComponent, GuestBlockComponent], 
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {

  // AGREGADO: Inyectamos el servicio de sesión
  public sessionService = inject(SessionService);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  // Inyectamos el servicio
  public chatbotService = inject(ChatbotService);
  
  // Variable para el input de texto
  nuevoMensaje: string = '';

  ngOnInit(): void {
    // Al iniciar, podemos limpiar o cargar historial si el backend lo permite
  }

  // Se ejecuta cada vez que algo cambia en la vista (ej: llega un mensaje)
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onEnter(event: Event) {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) { // Enter solo envía
      e.preventDefault();
      this.enviarMensaje();
    }
    // Shift+Enter hace salto de línea normal
  }

  enviarMensaje() {
    // --- INICIO PRUEBA BACKEND (ELIMINAR CUANDO TENGAS API REAL) ---
    // Bloqueo lógico: Si es invitado, no hace nada
    if (this.sessionService.isGuest()) {
      console.log('Acción bloqueada: Usuario es invitado');
      return;
    }
    // --- FIN PRUEBA BACKEND ---

    if (this.nuevoMensaje.trim()) {
      this.chatbotService.sendMessage(this.nuevoMensaje);
      this.nuevoMensaje = ''; // Limpiar input
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}