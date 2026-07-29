import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visor-fotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visor-fotos.html',
  styleUrl: './visor-fotos.css'
})
export class VisorFotosComponent {
  // [FRONTEND]: Recibe el array de strings (base64 o URLs)
  @Input() fotos: string[] = [];
  
  // [FRONTEND]: Recibe qué foto se tocó primero para empezar ahí
  @Input() set indexInicial(val: number) {
    this.currentIndex.set(val);
  }

  @Output() cerrar = new EventEmitter<void>();

  // Usamos signal para una reactividad más rápida en Angular moderno
  currentIndex = signal(0);

  // [PRUEBAS]: Controlar que no se pase del límite de fotos al navegar
  navegar(paso: number) {
    const proximo = this.currentIndex() + paso;
    if (proximo >= 0 && proximo < this.fotos.length) {
      this.currentIndex.set(proximo);
    }
  }
}