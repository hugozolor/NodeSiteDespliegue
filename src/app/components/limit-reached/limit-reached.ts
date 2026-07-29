import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limit-reached',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './limit-reached.html',
  styleUrl: './limit-reached.css'
})
export class LimitReachedComponent {
  // Inyectamos el router para la navegación
  private router = inject(Router);
  
  proximoMes: string;

  constructor() {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + 1);
    // [FRONTEND]: Formateamos el mes siguiente para mostrarlo en el HTML
    this.proximoMes = fecha.toLocaleString('es-ES', { month: 'long' });
  }

  // MÉTODO PARA VOLVER AL INICIO
  irAlMenu() {
    // [FRONTEND]: Navega a la ruta principal (ajustar '/mapa' si es otra)
    this.router.navigate(['/dashboard']); 
  }
}