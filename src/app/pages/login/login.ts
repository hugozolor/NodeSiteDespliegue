import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);

  // Modelo de datos para el formulario
  loginData = {
    email: '',
    username: ''
  };

  onLogin() {
    if (this.loginData.email && this.loginData.username) {
      console.log('Intentando iniciar sesión con:', this.loginData);

      // =========================================================
      // [BACKEND]: LÓGICA DE AUTENTICACIÓN
      // 1. Aquí se llamará al servicio de Auth (this.authService.login)
      // 2. Se validará que el correo exista en la DB.
      // 3. Se validará que el username coincida.
      // 4. Se recibirá el Token JWT o sesión.
      // =========================================================

      // Simulación de éxito:
      alert('Inicio de sesión exitoso (Simulación)');
      this.router.navigate(['/admin/tablero-control']); 
      
      // NOTA: El código de navegación arriba se moverá dentro 
      // del subscribe cuando el backend sea real.
    }
  }

  // Getter para validar el formulario (Deshabilita el botón)
  get isFormInvalid(): boolean {
    return !this.loginData.email || !this.loginData.username;
  }
}