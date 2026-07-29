import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Barrio } from '../models/barrio';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  // ==================================================
  // 1. BARRIOS (Fuente de verdad: Admin y Usuario)
  // ==================================================
  private barriosIniciales: Barrio[] = [
    { id: '1', nombre: 'Centro', puntuacionGeneral: 4.5, activo: true },
    { id: '2', nombre: 'Barrio Norte', puntuacionGeneral: 3.8, activo: true },
    { id: '3', nombre: 'Villa Mitre', puntuacionGeneral: 5.0, activo: true }
  ];
  
  private barriosSubject = new BehaviorSubject<Barrio[]>(this.barriosIniciales);
  barrios$ = this.barriosSubject.asObservable();

  // ==================================================
  // 2. REVIEWS / RESEÑAS (Conexión Usuario -> Admin)
  // ==================================================
  private reviewsIniciales: Review[] = [
    { 
      id: '101',
      barrioId: '1',
      nombreBarrio: 'Centro',
      usuarioId: 'user-01',
      usuarioNombre: 'Ciudadano Ejemplo',
      calificacion: 4, 
      comentario: 'Buena iluminación, pero falta limpieza en las veredas.', 
      fecha: new Date(),
      estado: 'publicada'
    }
  ];

  private reviewsSubject = new BehaviorSubject<Review[]>(this.reviewsIniciales);
  reviews$ = this.reviewsSubject.asObservable();

  constructor() { }

  // --- MÉTODOS PARA ADMIN (Barrios) ---
  
  agregarBarrio(nombre: string) {
    const nuevo: Barrio = {
      id: Date.now().toString(),
      nombre: nombre,
      puntuacionGeneral: 0, // Empieza en 0
      activo: true
    };
    const actuales = this.barriosSubject.value;
    this.barriosSubject.next([...actuales, nuevo]);
  }

  eliminarBarrio(id: string) {
    // Soft delete: solo lo desactivamos o lo filtramos
    const actuales = this.barriosSubject.value.filter(b => b.id !== id);
    this.barriosSubject.next(actuales);
  }

  // --- MÉTODOS PARA USUARIO (Publicar) ---
  
  publicarReview(review: Review) {
    const actuales = this.reviewsSubject.value;
    // Agregamos la nueva review al principio de la lista
    this.reviewsSubject.next([review, ...actuales]); 
    console.log('Nueva reseña guardada y enviada al Admin:', review);
  }

  // --- MÉTODOS PARA ADMIN (Moderar Reviews) ---
  
  eliminarReview(id: string) {
    const actuales = this.reviewsSubject.value.filter(r => r.id !== id);
    this.reviewsSubject.next(actuales);
  }
}