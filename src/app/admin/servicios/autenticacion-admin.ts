import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from '../modelos/admin';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionAdminService {
  // Guardamos los datos del admin en un "Subject" para que toda la app sepa si está logueado
  private adminActualSubject: BehaviorSubject<Admin | null>;
  public adminActual: Observable<Admin | null>;

  constructor(private http: HttpClient) {
    // Al iniciar, buscamos si ya había un admin guardado en la memoria del navegador
    this.adminActualSubject = new BehaviorSubject<Admin | null>(JSON.parse(localStorage.getItem('adminNodeSite') || 'null'));
    this.adminActual = this.adminActualSubject.asObservable();
  }

  // Lógica para iniciar sesión
  login(usuario: string, clave: string): Observable<Admin> {

// --- LÓGICA DE PRUEBA FRONTEND (Eliminar cuando el Backend esté listo) ---
  if (usuario === 'admin@nodesite.com' && clave === 'salta2026') {
    const adminFalso: Admin = {
      id: 'admin-001',
      nombre: 'Administrador de Pruebas',
      usuario: 'admin_test',
      email: usuario,
      ultimoAcceso: new Date()
    };
    localStorage.setItem('adminNodeSite', JSON.stringify(adminFalso));
    this.adminActualSubject.next(adminFalso);
    return new Observable(subscriber => subscriber.next(adminFalso));
  }
  // --------

    // Aquí pondremos la URL real de tu servidor más adelante
    return this.http.post<Admin>(`tu-api/admin/login`, { usuario, clave })
      .pipe(map(admin => {
        // Si el login es exitoso, guardamos al admin en el navegador
        localStorage.setItem('adminNodeSite', JSON.stringify(admin));
        this.adminActualSubject.next(admin);
        return admin;
      }));
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('adminNodeSite');
    this.adminActualSubject.next(null);
  }
}