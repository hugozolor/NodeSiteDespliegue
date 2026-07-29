import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs'; // Importamos BehaviorSubject
import { ObraPin } from '../modelos/obra-pin';

@Injectable({
  providedIn: 'root'
})
export class MapaAdminService {
  // BACKEND: Reemplazar esta URL por la real
  private apiUrl = 'tu-api/admin/pines'; 

  // --- NUEVO: Lógica de contador reactivo ---
  private contadorObras = new BehaviorSubject<number>(0); 
  obrasActivas$ = this.contadorObras.asObservable(); // Observable público
  // ------------------------------------------

  constructor(private http: HttpClient) { }

  // Método para incrementar el contador (llamado desde gestion-mapa.ts)
  incrementarContadorObras() {
    this.contadorObras.next(this.contadorObras.value + 1);
  }

  // =========================================================
  // DATOS MOCK - SOLO FRONTEND
  // ELIMINAR ESTA VARIABLE CUANDO SE CONECTE EL BACKEND
  // =========================================================
  private mockPines: ObraPin[] = [
    {
      id: 'mock-1',
      titulo: 'Repavimentación Av. Belgrano',
      descripcion: 'Corte total por obras de bacheo profundo.',
      tipoObra: 'Vial',
      latitud: -24.7892,
      longitud: -65.4103,
      origen: 'admin',
      estado: 'en-progreso',
      imagenes: [
        'https://picsum.photos/id/237/400/300', 
        'https://picsum.photos/id/238/400/300',
        'https://picsum.photos/id/239/400/300'
      ],
      fechaInicio: new Date(),
      fechaExpiracion: new Date()
    },
    {
      id: 'mock-2',
      titulo: 'Reporte Vecinal',
      descripcion: 'Hay un poste de luz que se está por caer y los cables están colgando muy bajo, es un peligro para los niños que juegan en la plaza. Por favor vengan urgente antes de que pase una desgracia. Ya llamamos 3 veces y nadie viene.',
      tipoObra: 'Agua/Saneamiento',
      latitud: -24.7850,
      longitud: -65.4150,
      origen: 'usuario',
      usuario: 'juan_perez_99',
      estado: 'en-progreso',
      imagenes: [],
      fechaInicio: new Date(),
      fechaExpiracion: new Date()
    }
  ];

  // Obtener todos los pines (Admins + Usuarios)
  obtenerPines(): Observable<ObraPin[]> {
    // BACKEND: return this.http.get<ObraPin[]>(this.apiUrl);
    return of(this.mockPines);
  }

  // Crear un nuevo pin
  crearPin(nuevoPin: ObraPin): Observable<ObraPin> {
    // BACKEND: return this.http.post<ObraPin>(this.apiUrl, nuevoPin);
    console.log('BACKEND SIMULADO: Guardando pin...', nuevoPin);
    
    // Simulación: Si ya existe (edición), lo actualizamos en el array
    const index = this.mockPines.findIndex(p => p.id === nuevoPin.id);
    if (index !== -1) {
      this.mockPines[index] = nuevoPin;
    } else {
      this.mockPines.push(nuevoPin);
    }
    
    return of(nuevoPin);
  }

  // Eliminar pin (Moderación)
  eliminarPin(id: string): Observable<any> {
    // BACKEND: return this.http.delete(`${this.apiUrl}/${id}`);
    console.log('BACKEND SIMULADO: Eliminando pin ID:', id);
    this.mockPines = this.mockPines.filter(p => p.id !== id);
    return of(true);
  }
}