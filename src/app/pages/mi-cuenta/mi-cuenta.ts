import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; // Importación para la redirección
import { HeaderComponent } from '../../components/header/header';
import { NavBottomComponent } from '../../components/nav-bottom/nav-bottom';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, HeaderComponent, NavBottomComponent],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css'
})
export class MiCuentaComponent {
  private router = inject(Router); // Inyección del Router

  // Datos del usuario (Solo lectura)
  usuarioActual = {
    username: 'Jose_técnico',
    email: 'jose.desarrollo@gmail.com'
  };

  // Estados de la interfaz
  showSecurityMessage = false; // Controla la expansión de la sección de contraseña
  hidePassword = true;         // Controla la visibilidad del texto (ojo)
  
  // Modelos de datos
  nuevaPassword = '';          // Almacena la entrada del usuario
  aceptaRiesgo = false;

  /**
   * Activa o desactiva la sección para cambiar la contraseña.
   * Si se cierra, limpia el campo de texto.
   */
  activarCambioPassword() {
    this.showSecurityMessage = !this.showSecurityMessage;
    if (!this.showSecurityMessage) {
      this.nuevaPassword = '';
    }
  }

  /**
   * Alterna la visibilidad del campo de contraseña entre puntos y texto plano.
   */
  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Ejecuta el cierre de sesión, limpia los datos correspondientes
   * y redirige de forma automática hacia la ruta /home.
   */
  logout() {
    console.log("Cerrando sesión y limpiando datos...");
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirección automática obligatoria
    this.router.navigate(['/home']);
  }

  /**
   * Resetea el formulario y cierra la sección expandible.
   */
  cancelar() {
    this.showSecurityMessage = false;
    this.nuevaPassword = '';
    this.aceptaRiesgo = false;
    console.log("Cambio de contraseña cancelado");
  }

  /**
   * Lógica para procesar la actualización.
   */
  actualizar() {
    if (this.isPasswordValid()) {
      console.log("Nueva contraseña establecida:", this.nuevaPassword);
      alert("¡Contraseña actualizada con éxito!");
      this.cancelar(); 
    }
  }

  /**
   * Validación simple de la contraseña.
   */
  isPasswordValid(): boolean {
    return this.nuevaPassword.length >= 6 && this.aceptaRiesgo; 
  }
}