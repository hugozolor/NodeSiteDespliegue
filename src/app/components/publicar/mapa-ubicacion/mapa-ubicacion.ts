import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../../services/reporte';

@Component({
  selector: 'app-mapa-ubicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-ubicacion.html',
  styleUrl: './mapa-ubicacion.css'
})
export class MapaUbicacionComponent {
  private reporteService = inject(ReporteService);

  @Input() lat: number = 0;
  @Input() lng: number = 0;

  @Output() onConfirmar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  confirmar() {
    // Siempre activo: confirmación directa sin validaciones previas
    this.onConfirmar.emit();
  }

  cancelar() {
    this.onCancelar.emit();
  }
}