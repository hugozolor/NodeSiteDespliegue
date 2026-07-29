import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- AGREGAR ESTO

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // <--- AGREGAR AQUI
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Lógica del home...
}