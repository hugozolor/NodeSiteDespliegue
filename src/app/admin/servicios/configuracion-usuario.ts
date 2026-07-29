import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TipoPin } from '../modelos/tipo-pin';
import { Barrio } from '../modelos/barrio';

@Injectable({ providedIn: 'root' })
export class ConfiguracionUsuarioService {
  // --- ESTADO INICIAL (Frontend Test) ---
  private pinesUserSubject = new BehaviorSubject<TipoPin[]>([
    { id: '1', nombre: 'Bache', iconoUrl: 'icons/bache.webp' },
    { id: '2', nombre: 'Iluminación', iconoUrl: 'icons/luz.webp' }
  ]);
  
  private barriosSubject = new BehaviorSubject<Barrio[]>([
    { id: '1', nombre: 'Centro' },
    { id: '2', nombre: 'Barrio Norte' }
  ]);

  pinesUser$ = this.pinesUserSubject.asObservable();
  barrios$ = this.barriosSubject.asObservable();

  // --- MÉTODOS PINES ---
  agregarPinUser(nuevo: TipoPin) {
    const actual = this.pinesUserSubject.value;
    nuevo.id = Date.now().toString();
    this.pinesUserSubject.next([...actual, nuevo]);
    return of(nuevo);
  }

  eliminarPinUser(id: string) {
    const nuevaLista = this.pinesUserSubject.value.filter(p => p.id !== id);
    this.pinesUserSubject.next(nuevaLista);
    return of(true);
  }

  // --- MÉTODOS BARRIOS ---
  agregarBarrio(nombre: string) {
    const actual = this.barriosSubject.value;
    const nuevo = { id: Date.now().toString(), nombre };
    this.barriosSubject.next([...actual, nuevo]);
    return of(nuevo);
  }

  eliminarBarrio(id: string) {
    const nuevaLista = this.barriosSubject.value.filter(b => b.id !== id);
    this.barriosSubject.next(nuevaLista);
    return of(true);
  }
}