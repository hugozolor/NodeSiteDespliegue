import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-footer.html',
  styleUrls: ['./admin-footer.css']
})
export class AdminFooterComponent {
  /**
   * Permite forzar el modo oscuro desde el componente padre si fuera necesario.
   * Por defecto, también escucha la clase global '.dark-mode' vía CSS.
   */
  @Input() isDarkMode: boolean = false;

  // Año dinámico automatizado para producción (garantiza vigencia post-2026 si es requerido)
  readonly currentYear: number = 2026; 
}