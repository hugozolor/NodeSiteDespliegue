import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Barrio } from '../models/barrio';

@Injectable({ providedIn: 'root' })
export class BarriosService {
  private http = inject(HttpClient);

  getBarrios(): Observable<Barrio[]> {
    // [BACKEND] Cambiar por URL real: return this.http.get<Barrio[]>('api/barrios');
    return of([]); // Retorno vacío por ahora ya que usamos MOCK DATA en el componente
  }

  getRanking(): Observable<Barrio[]> {
    return of([]);
  }
}