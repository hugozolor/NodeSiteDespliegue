import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'; // Usamos BehaviorSubject para datos en tiempo real
import { Noticia } from '../admin/modelos/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasAppService {

  // Datos iniciales de prueba
  private mockNoticias: Noticia[] = [
    {
      id: '1',
      titulo: 'Nueva Luminaria LED',
      contenido: 'Mejoramos la iluminación en Barrio Norte para mayor seguridad.',
      tipo: 'importante',
      fecha: new Date()
    },
    {
      id: '2',
      titulo: 'Corte de Agua Programado',
      contenido: 'Mañana de 08:00 a 12:00 por reparaciones en la red principal.',
      tipo: 'noticia',
      fecha: new Date()
    }
  ];

  // Creamos un Subject para que los componentes escuchen cambios
  private noticiasSubject = new BehaviorSubject<Noticia[]>(this.mockNoticias);

  constructor() { }

  // El Dashboard se suscribe a esto
  obtenerNoticias(): Observable<Noticia[]> {
    return this.noticiasSubject.asObservable();
  }

  // El Admin llama a esto para publicar
  publicarNoticia(noticia: Noticia) {
    this.mockNoticias.unshift(noticia); // Agrega al principio
    this.noticiasSubject.next(this.mockNoticias); // Notifica a todos
  }

  // El Admin llama a esto para borrar
  eliminarNoticia(id: string) {
    this.mockNoticias = this.mockNoticias.filter(n => n.id !== id);
    this.noticiasSubject.next(this.mockNoticias);
  }
}