import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../servicios/loader.service'; // Ajusta la ruta según dónde guardes el servicio
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './page-loader.html',
  styleUrls: ['./page-loader.css']
})
export class PageLoaderComponent {
  // Esta es la variable exacta que te pedía el HTML
  public isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    // Vinculamos el estado del componente directamente con el flujo del servicio
    this.isLoading$ = this.loaderService.isLoading$;
  }
}