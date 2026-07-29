import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private http = inject(HttpClient);

  // [BACKEND]: Cambiar por la URL real de la API
  private readonly API_URL = 'api/reviews';

  /**
   * GUARDA LA RESEÑA
   * @param review Usamos 'any' para que el Front-end pueda enviar datos de prueba libremente
   */
  saveReview(review: any): Observable<any> {
    console.log('--- LOG PARA EL BACKEND ---');
    console.log('Objeto que envía el Front-end:', review);

    // ==============================================================================
    // [BACKEND]: ELIMINAR ESTE BLOQUE DE 'return of' Y DESCOMENTAR EL POST DE ABAJO
    // ==============================================================================
    return of({ success: true }).pipe(delay(800)); // Simula latencia de red

    /* return this.http.post(this.API_URL, review); 
    */
  }

  /**
   * OBTIENE EL HISTORIAL (Para probar la vista de Reseñas)
   */
  getUserReviews(userId: string): Observable<Review[]> {
    // [BACKEND]: return this.http.get<Review[]>(`${this.API_URL}/user/${userId}`);
    
    const mockData: Review[] = [
      {
        barrioId: '1',
        usuarioId: userId,
        calificacion: 5,
        comentario: 'Barrio muy tranquilo, recomendado.',
        fecha: new Date()
      }
    ];
    return of(mockData).pipe(delay(500));
  }
}