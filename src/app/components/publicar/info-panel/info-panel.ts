import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reporte } from '../../../models/reporte';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.html',
  styleUrl: './info-panel.css'
})
export class InfoPanelComponent {
  // Recibe el objeto reporte seleccionado desde el mapa principal
  @Input() reporte: Reporte | null = null; 

  // Emite un evento para cerrar el panel
  @Output() alCerrar = new EventEmitter<void>();

  // Emite el índice de la foto para verla en pantalla completa
  @Output() alVerFoto = new EventEmitter<number>();

  cerrar() {
    this.alCerrar.emit();
  }

  verFoto(index: number) {
    this.alVerFoto.emit(index);
  }

  tieneFotos(): boolean {
    return !!(this.reporte?.fotos && this.reporte.fotos.length > 0);
  }

  // [BACKEND]: Aquí deberías inyectar un servicio (ej. ReporteService)
  // para enviar un "voto" o "validación" a la base de datos.
  validarReporte() {
    console.log("Enviando validación a la BD para el reporte:", this.reporte?.id);
    // this.apiService.votarReporte(this.reporte?.id).subscribe(...);
  }
}