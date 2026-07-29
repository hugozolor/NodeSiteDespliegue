import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
// Usamos el servicio centralizado
import { DatosCompartidosService } from '../../services/datos-compartidos';
import { Review } from '../../models/review';

@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './resena.html',
  styleUrl: './resena.css'
})
export class ResenaComponent implements OnInit {
  private datosService = inject(DatosCompartidosService);
  private router = inject(Router);

  resenas: Review[] = [];

  ngOnInit() {
    // Suscripción al "Cerebro Central"
    this.datosService.reviews$.subscribe(data => {
      // Filtramos (simulación) solo las del usuario actual si tuviéramos auth real
      this.resenas = data;
    });
  }

  getStars(n: number): number[] {
    return Array(n).fill(0);
  }

  irAFormulario() {
    this.router.navigate(['/publish-review']);
  }
}