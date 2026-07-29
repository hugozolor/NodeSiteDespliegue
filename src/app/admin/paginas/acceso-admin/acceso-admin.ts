import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionAdminService } from '../../servicios/autenticacion-admin';

@Component({
  selector: 'app-acceso-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acceso-admin.html',
  styleUrls: ['./acceso-admin.css']
})
export class AccesoAdminComponent {
  // Datos del formulario
  loginData = {
    email: '',
    clave: ''
  };

  error: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AutenticacionAdminService,
    private router: Router
  ) {}

  onLoginAdmin() {
    this.cargando = true;
    this.error = '';

    // Llamamos al servicio (por ahora usará el placeholder de la API)
    this.authService.login(this.loginData.email, this.loginData.clave).subscribe({
      next: (res) => {
        // Si es correcto, mandamos al admin al tablero
        this.router.navigate(['/admin/tablero-control']);
      },
      error: (err) => {
        this.error = 'Credenciales administrativas incorrectas.';
        this.cargando = false;
      }
    });
  }
}