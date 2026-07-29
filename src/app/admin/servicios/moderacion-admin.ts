import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ReporteSancion } from '../modelos/advertencia';
import { Resena } from '../modelos/resena';

@Injectable({
  providedIn: 'root'
})
export class ModeracionAdminService {
  private apiUrl = 'tu-api/admin/moderacion';

  // --- NUEVO: Lógica de contador reactivo ---
  private contadorPendientes = new BehaviorSubject<number>(0); // Empieza en 5 o el valor que desees
  contador$ = this.contadorPendientes.asObservable();

  constructor(private http: HttpClient) { }

  // Método para incrementar desde el componente de advertencia
  incrementarContador() {
    this.contadorPendientes.next(this.contadorPendientes.value + 1);
  }
  // ------------------------------------------

  obtenerAdvertencias(): Observable<ReporteSancion[]> {
    return this.http.get<ReporteSancion[]>(`${this.apiUrl}/reportes`);
  }

  procesarAdvertencia(id: string, accion: 'eliminado' | 'advertencia' | 'ninguna'): Observable<ReporteSancion> {
    return this.http.post<ReporteSancion>(`${this.apiUrl}/procesar`, { id, accion });
  }
}