import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationLimitService {
  private readonly MAX_CHANCES = 5;
  private readonly STORAGE_KEY = 'nodesite_chances';
  private readonly MONTH_KEY = 'nodesite_last_month';

  private _chances = signal<number>(this.MAX_CHANCES);
  chancesActuales = computed(() => this._chances());

  constructor() {
    this.cargarEstadoInicial();

    // ======================================================================
    //  [COMENTARIO DE PRUEBA - FRONTEND]: 
    // La línea de abajo resetea tus intentos a 5 cada vez que recargas la web.
    // Esto es para que no te quedes bloqueado mientras diseñas.
    // ELIMINAR ESTA LÍNEA CUANDO SE PASE A PRODUCCIÓN.
    // ======================================================================
    this.resetearChances(`${new Date().getMonth()}-${new Date().getFullYear()}`); 
  }

  private cargarEstadoInicial() {
    const ahora = new Date();
    const mesActual = `${ahora.getMonth()}-${ahora.getFullYear()}`;
    const mesGuardado = localStorage.getItem(this.MONTH_KEY);

// Si es un mes nuevo, reseteamos
    if (mesGuardado !== mesActual) {
      this.resetearChances(mesActual);
    } else {

// Si es el mismo mes, cargamos lo que quedó
      const guardado = localStorage.getItem(this.STORAGE_KEY);
      this._chances.set(guardado ? parseInt(guardado) : this.MAX_CHANCES);
    }
  }

  private resetearChances(nuevoMes: string) {
    localStorage.setItem(this.MONTH_KEY, nuevoMes);
    localStorage.setItem(this.STORAGE_KEY, this.MAX_CHANCES.toString());
    this._chances.set(this.MAX_CHANCES);
  }

    // Método principal para saber si puede publicar
  puedePublicar(): boolean {
    return this._chances() > 0;
  }

  consumirChance() {
    //  [NOTA PARA BACKEND]: 
    // Esta lógica de descuento debe estar replicada en el servidor.
    // No confíen solo en el LocalStorage para el límite real.
    if (this._chances() > 0) {
      const nuevoValor = this._chances() - 1;
      this._chances.set(nuevoValor);
      localStorage.setItem(this.STORAGE_KEY, nuevoValor.toString());
    }
  }
}