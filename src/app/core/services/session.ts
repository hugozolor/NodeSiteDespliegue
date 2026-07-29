import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // ==========================================
  //  APARTADO DE PRUEBA FRONTEND (MODIFICAR AQUÍ)
  // ==========================================
  // Cambia a 'GUEST' para ver el bloqueo.
  // Cambia a 'USER' para usar la app normalmente.
  public userRole = signal<'GUEST' | 'USER' | 'ADMIN'>('USER'); 
  // ==========================================

  constructor() {
    // Para la PRUEBA, comentamos la lógica de backend para que mande el Signal de arriba
    // this.checkSession(); // <-- ELIMINAR COMENTARIO CUANDO TENGAS EL BACKEND LISTO
  }

  // ---  PREPARACIÓN PARA BACKEND ---
  checkSession() {
    const token = localStorage.getItem('ns_token');
    if (token) {
      this.userRole.set('USER');
    } else {
      this.userRole.set('GUEST');
    }
  }

  isGuest(): boolean {
    return this.userRole() === 'GUEST';
  }

  logout() {
    localStorage.removeItem('ns_token');
    this.userRole.set('GUEST');
  }
}