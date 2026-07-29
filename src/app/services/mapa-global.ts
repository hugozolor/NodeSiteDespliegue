import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Modelo unificado para visualización (Compatible con Admin y Usuario)
export interface PinRender {
  id: string;
  lat: number;
  lng: number;
  tipo: string;      
  iconoUrl: string;  
  descripcion: string;
  imagenes: string[];
  usuario: string;   
  esAdmin: boolean;  
  fecha: Date;
}

// Modelo para Tipos de Pines (Configuración Admin)
export interface TipoPin {
  id: string;
  nombre: string;
  iconoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapaGlobalService {

  // =========================================================
  // 1. ESTADO GLOBAL DE PINES (LA FUENTE DE VERDAD)
  // =========================================================
  
  // Datos iniciales de prueba (Persisten mientras no recargues la página)
  private pinesIniciales: PinRender[] = [
    {
      id: 'admin-1', lat: -24.7821, lng: -65.4232, tipo: 'Obra Vial', 
      iconoUrl: 'assets/icons/obra.png', 
      descripcion: 'Repavimentación oficial.', imagenes: [],
      usuario: 'Municipalidad', esAdmin: true, fecha: new Date()
    },
    {
      id: 'user-1', lat: -24.7850, lng: -65.4150, tipo: 'Bache', 
      iconoUrl: 'assets/icons/bache.png', 
      descripcion: 'Pozo peligroso en la esquina.', imagenes: [],
      usuario: 'Juan Perez', esAdmin: false, fecha: new Date()
    }
  ];

  // BehaviorSubject mantiene el último estado y lo emite a quien se suscriba
  private pinesSubject = new BehaviorSubject<PinRender[]>(this.pinesIniciales);
  pines$ = this.pinesSubject.asObservable();

  // =========================================================
  // 2. TIPOS DE PINES (Configuración Admin)
  // =========================================================
  private tiposPinesMock: TipoPin[] = [
    { id: '1', nombre: 'Bache', iconoUrl: 'assets/icons/pin.webp' },
    { id: '2', nombre: 'Alumbrado', iconoUrl: 'assets/icons/pin.webp' },
    { id: '3', nombre: 'Basura', iconoUrl: 'assets/icons/pin.webp' }
  ];
  private tiposPinesSubject = new BehaviorSubject<TipoPin[]>(this.tiposPinesMock);
  tiposPines$ = this.tiposPinesSubject.asObservable();

  // 3. BORRADOR (Para flujo de publicación)
  private borradorPin: Partial<PinRender> | null = null;

  constructor() { }

  // --- MÉTODOS PINES DEL MAPA ---

  obtenerPines(): Observable<PinRender[]> {
    return this.pines$;
  }

  // --- ACCIONES DE USUARIO ---
  
  guardarBorrador(datos: Partial<PinRender>) {
    this.borradorPin = datos;
  }

  obtenerBorrador() {
    return this.borradorPin;
  }

  // Método requerido por mapa.ts
  limpiarBorrador() {
    this.borradorPin = null;
  }

  // Alias requerido por mapa.ts
  confirmarPublicacion(lat: number, lng: number) {
    this.confirmarPublicacionUsuario(lat, lng);
  }

  confirmarPublicacionUsuario(lat: number, lng: number) {
    if (!this.borradorPin) return;

    const nuevoPin: PinRender = {
      id: Date.now().toString(),
      tipo: 'Reporte',
      iconoUrl: 'assets/icons/pin.webp',
      descripcion: '',
      imagenes: [],
      usuario: 'Anónimo',
      esAdmin: false,
      fecha: new Date(),
      ...this.borradorPin, 
      lat: lat,
      lng: lng
    };

    this.agregarPinGlobal(nuevoPin);
    this.limpiarBorrador(); 
  }

  // --- ACCIONES DE ADMIN ---

  agregarPinAdmin(pinAdmin: PinRender) {
    pinAdmin.esAdmin = true;
    this.agregarPinGlobal(pinAdmin);
  }

  eliminarPin(id: string) {
    const actuales = this.pinesSubject.value.filter(p => p.id !== id);
    this.pinesSubject.next(actuales);
  }

  // --- MÉTODO PRIVADO CENTRAL ---
  
  private agregarPinGlobal(pin: PinRender) {
    const actuales = this.pinesSubject.value;
    this.pinesSubject.next([...actuales, pin]);
    console.log(' Pin agregado al mapa global:', pin);
  }

  // --- GESTIÓN DE TIPOS DE PINES (CONFIGURACIÓN) ---
  
  obtenerTiposPines() { return this.tiposPines$; }
  
  agregarTipoPin(nuevo: TipoPin) {
    const actuales = this.tiposPinesSubject.value;
    this.tiposPinesSubject.next([...actuales, nuevo]);
  }

  // [NUEVO] Método que faltaba y causaba error en pines-usuarios.ts
  eliminarTipoPin(id: string) {
    const actuales = this.tiposPinesSubject.value.filter(t => t.id !== id);
    this.tiposPinesSubject.next(actuales);
  }
}