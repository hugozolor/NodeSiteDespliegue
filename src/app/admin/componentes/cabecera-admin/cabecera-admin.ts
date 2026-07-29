import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'; // <-- FIX: Esto quita el error de matTooltip
import { LayoutService } from '../../servicios/layout.service'; // <-- FIX: Apunta a tu carpeta real

@Component({
  selector: 'app-cabecera-admin',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatTooltipModule
  ],
  templateUrl: './cabecera-admin.html',
  styleUrls: ['./cabecera-admin.css']
})
export class CabeceraAdminComponent implements OnInit, OnDestroy {
  // Inyección del servicio que acabamos de crear
  public layoutService = inject(LayoutService);

  fechaActual: Date = new Date();
  private intervalo: any;

  adminProfile = {
    nombre: 'Admin',
    correo: 'Admin@nodesite.com',
    rol: 'Administrador Principal',
    ultimoAcceso: new Date()
  };

  toggleModoOscuro() {
  // Alterna la clase 'dark-theme' directamente en el body del navegador para que afecte a toda la app
  document.body.classList.toggle('dark-theme');
}

  ngOnInit() {
    this.intervalo = setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  onConfiguracion() {
    console.log('Navegando a configuración...');
  }

  onCerrarSesion() {
    console.log('Cerrando sesión...');
  }
}