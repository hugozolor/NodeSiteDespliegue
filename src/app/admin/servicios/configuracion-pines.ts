import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoPin } from '../modelos/tipo-pin';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionPinesService {
  
  // --- URL DEL BACKEND (Descomentar cuando esté listo) ---
  // private apiUrl = 'https://api.nodesite.com/admin/tipos-pin';

  // --- LÓGICA DE ESTADO (Frontend Test) ---
  // Usamos BehaviorSubject para que cualquier componente (como el mapa) se entere de los cambios al instante
  private tiposSubject = new BehaviorSubject<TipoPin[]>([
    { id: '1', nombre: 'Vial', iconoUrl: 'icons/pin.webp', esPredeterminado: true },
    { id: '2', nombre: 'Eléctrica', iconoUrl: 'icons/pin.webp' },
    { id: '3', nombre: 'Agua/Saneamiento', iconoUrl: 'icons/pin.webp' }
  ]);
  
  public tipos$ = this.tiposSubject.asObservable(); // El mapa se suscribirá a esto

  constructor(private http: HttpClient) { }

  // --- MÉTODOS ---

  obtenerTipos(): Observable<TipoPin[]> {
    // BACKEND: return this.http.get<TipoPin[]>(this.apiUrl);
    
    // FRONTEND TEST: Devolvemos los datos en memoria
    return this.tipos$;
  }

  agregarTipo(nuevoTipo: TipoPin): Observable<TipoPin> {
    // BACKEND: return this.http.post<TipoPin>(this.apiUrl, nuevoTipo);

    // FRONTEND TEST: Simulamos agregar a la lista
    const listaActual = this.tiposSubject.value;
    nuevoTipo.id = Date.now().toString(); // Generamos ID falso
    const nuevaLista = [...listaActual, nuevoTipo];
    this.tiposSubject.next(nuevaLista); // Avisamos a todos del cambio
    return of(nuevoTipo);
  }

  actualizarTipo(id: string, datos: Partial<TipoPin>): Observable<any> {
    // BACKEND: return this.http.put(`${this.apiUrl}/${id}`, datos);

    // FRONTEND TEST
    const lista = this.tiposSubject.value.map(t => 
      t.id === id ? { ...t, ...datos } : t
    );
    this.tiposSubject.next(lista);
    return of(true);
  }

  eliminarTipo(id: string): Observable<any> {
    // BACKEND: return this.http.delete(`${this.apiUrl}/${id}`);

    // FRONTEND TEST
    const lista = this.tiposSubject.value.filter(t => t.id !== id);
    this.tiposSubject.next(lista);
    return of(true);
  }
}