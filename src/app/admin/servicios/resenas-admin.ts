import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resena } from '../modelos/resena';

@Injectable({
  providedIn: 'root'
})
export class ResenasAdminService {
  private apiUrl = 'tu-api/admin/resenas';

  // Datos de prueba
  private baseResenas: Resena[] = [
    { id: 1, usuario: 'juan_perez', barrio: 'Tres Cerritos', comentario: 'Falta iluminación en la plaza.', estrellas: 4, fecha: '2024-05-20' },
    { id: 2, usuario: 'maria_g', barrio: 'Santa Ana', comentario: 'Muchos baches en la entrada.', estrellas: 1, fecha: '2024-05-21' }
  ];

  constructor(private http: HttpClient) { }

  obtenerTodasResenas(): Observable<Resena[]> {
    // Cuando tengas la API: return this.http.get<Resena[]>(this.apiUrl);
    return of(this.baseResenas);
  }

  eliminarResena(id: number): Observable<boolean> {
    this.baseResenas = this.baseResenas.filter(r => r.id !== id);
    return of(true);
  }
}