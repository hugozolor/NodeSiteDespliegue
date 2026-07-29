import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // [BACKEND]: Para llamadas reales

// Interface para el historial del usuario
export interface Resena {
  id: number;
  usuario: string;
  barrio: string;
  comentario: string;
  calificacion: number;
  fecha: string; // El historial lo muestra como texto (ej: "19/1/2026")
}

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  // private http = inject(HttpClient); // [BACKEND]: Inyectar para conectar con la API

  /**
   * 🧪 PRUEBA FRONTEND: Datos iniciales.
   * Cuando el Admin agregue barrios y tú publiques, se sumarán aquí.
   */
  private resenasDB: Resena[] = [
    { 
      id: 1, 
      usuario: 'Santi', 
      barrio: 'Tres Cerritos', 
      comentario: 'Me encanta la seguridad y la vista.', 
      calificacion: 5, 
      fecha: '18/01/2026' 
    }
  ];

  private resenasSubject = new BehaviorSubject<Resena[]>(this.resenasDB);
  public resenas$ = this.resenasSubject.asObservable();

  /**
   * MÉTODO PARA PUBLICAR
   * Aquí solucionamos el error de 'Date' vs 'string'
   */
  publicarResena(nueva: any) {
    // 1. [FRONTEND]: Adaptamos el objeto para que coincida con la interfaz Resena
    const resenaFormateada: Resena = {
      id: nueva.id || Date.now(),
      usuario: nueva.usuario || 'Usuario Actual',
      barrio: nueva.barrio,
      comentario: nueva.comentario,
      calificacion: nueva.calificacion,
      // SOLUCIÓN AL ERROR: Si viene como Date, lo pasamos a string local
      fecha: nueva.fecha instanceof Date ? nueva.fecha.toLocaleDateString() : nueva.fecha
    };

    /**
     * [BACKEND]: Conexión Real
     * Aquí deberías hacer:
     * return this.http.post('tu-api/resenas', resenaFormateada).subscribe(...)
     */

    // Actualizamos la lista local para que se vea el cambio al instante en /resena
    this.resenasDB = [resenaFormateada, ...this.resenasDB];
    this.resenasSubject.next(this.resenasDB);
  }

  getResenas(): Resena[] {
    return this.resenasDB;
  }
}