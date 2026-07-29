import { Component,  inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent {
  // Lógica de estado del componente
    private router = inject(Router);
}