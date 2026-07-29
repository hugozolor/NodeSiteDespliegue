import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importamos RouterModule
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-bottom',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule], // Agregamos RouterModule
  templateUrl: './nav-bottom.html',
  styleUrl: './nav-bottom.css'
})
export class NavBottomComponent {
  constructor(private router: Router) {}
}