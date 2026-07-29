import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-guest-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-block.html',
  styleUrl: './guest-block.css'
})
export class GuestBlockComponent {
  private router = inject(Router);
  private location = inject(Location);

  // [NUEVO] Evento para avisar al padre (Header) que cierre el cartel
  @Output() close = new EventEmitter<void>();

  goToRegister() {
    this.router.navigate(['/register']); 
  }

  goToLogin() {
    this.router.navigate(['/login']); 
  }

  // [NUEVO] Método para volver al menú principal
  goBackToMenu() {
    this.router.navigate(['/dashboard']);
  }

  // [NUEVO] Método para cerrar el cartel (X)
  onClose() {
    // Emitimos el evento para que el Header sepa que debe ocultarse
    this.close.emit();
    
    // Opcional: Si no está en el header, intentamos ir atrás en el historial
    // this.location.back(); 
  }
}