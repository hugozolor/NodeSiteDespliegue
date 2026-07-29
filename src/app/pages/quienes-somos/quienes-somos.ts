import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
})
export class NosotrosComponent {
  titulo = '¿Quiénes Somos?';
  mision = 'Nuestra Misión';
  textoMision = 'Somos un equipo de estudiantes de secundaria técnica apasionados por la tecnología y el desarrollo web. Creamos NodeSite con el objetivo de diseñar una herramienta interactiva y eficiente que conecte directamente a los vecinos de Salta con la Municipalidad, facilitando la resolución de incidentes en los barrios y promoviendo una participación ciudadana activa.';
      private router = inject(Router);
}