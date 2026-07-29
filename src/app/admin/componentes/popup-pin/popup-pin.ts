import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObraPin } from '../../modelos/obra-pin'; 

@Component({
  selector: 'app-popup-pin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-pin.html', 
  styleUrls: ['./popup-pin.css']
})
export class PopupPinComponent {
  @Input() pin!: ObraPin;
  
  // [NUEVO] Controla si se muestran los botones de acción
  @Input() soloLectura: boolean = false; 

  @Input() set pinData(data: any) {
    if (data) {
      this.pin = {
        id: data.id,
        titulo: data.tipo,
        descripcion: data.descripcion,
        tipoObra: data.tipo,
        latitud: data.lat,
        longitud: data.lng,
        origen: data.esAdmin ? 'admin' : 'usuario',
        usuario: data.usuario,
        estado: 'en-progreso',
        imagenes: data.imagenes || [],
        fechaInicio: data.fecha || new Date(),
        fechaExpiracion: new Date()
      };
    }
  }

  @Output() eliminar = new EventEmitter<string>();
  @Output() editar = new EventEmitter<string>();
  @ViewChild('carouselTrack') carouselTrack?: ElementRef;

  constructor() {}

  get inicial(): string {
    return this.pin?.usuario ? this.pin.usuario.charAt(0).toUpperCase() : '?';
  }

  scrollFotos(direction: 'left' | 'right'): void {
    if (!this.carouselTrack) return;
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth; 
    track.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }

  onEditar(): void { if (this.pin?.id) this.editar.emit(this.pin.id); }
  onEliminar(): void { if (this.pin?.id) this.eliminar.emit(this.pin.id); }
}