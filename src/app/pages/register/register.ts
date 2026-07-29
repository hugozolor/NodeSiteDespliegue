import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Asegúrate de tener esta importación

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router); // Esto es lo que permite "viajar" entre páginas

  registerData = { email: '', username: '' };

  onRegister() {
    // Si escribió algo, lo mandamos al menú
    if(this.registerData.email && this.registerData.username) {
        this.router.navigate(['/dashboard']);
    } else {
        alert("Completa los campos para continuar");
    }
  }
}