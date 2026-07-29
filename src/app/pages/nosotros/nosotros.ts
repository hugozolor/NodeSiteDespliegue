import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class GuiaComponent {
        private router = inject(Router);
  titulo = 'Centro de Ayuda al Vecino';
  subtitulo = 'Formato oficial para enviar reportes urbanos';

}
