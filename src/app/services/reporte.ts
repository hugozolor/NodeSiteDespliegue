import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Asegúrate de que la ruta al modelo sea correcta según tu estructura
import { Reporte, PasoFlujo } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  
  // 1. Estado inicial vacío (para resetear después de guardar)
  private reporteInicial: Reporte = {
    tipoPin: null,
    descripcion: '',
    fotos: [],
    usuario: 'Usuario_Demo',
    fecha: ''
  };

  // --- STORES (Memoria de la App) ---
  
  // Guarda el reporte que estás creando AHORA MISMO
  private reporteStore = new BehaviorSubject<Reporte>(this.reporteInicial);
  
  // Controla en qué paso estás (Seleccionar Pin, Mapa, Detalles, etc.)
  private pasoActual = new BehaviorSubject<PasoFlujo>('SELECCION_PIN');
  
  // Guarda TODOS los reportes que se ven en el mapa (la "Base de datos" local)
  private reportesComunitarios = new BehaviorSubject<Reporte[]>([]);
  
  // Guarda el reporte que clickeaste para ver detalles (InfoPanel)
  private reporteSeleccionado = new BehaviorSubject<Reporte | null>(null);

  // --- OBSERVABLES (Para que los componentes escuchen cambios) ---
  reporte$ = this.reporteStore.asObservable();
  pasoActual$ = this.pasoActual.asObservable();
  reportes$ = this.reportesComunitarios.asObservable(); // <--- El Mapa escucha esto
  reporteSeleccionado$ = this.reporteSeleccionado.asObservable();

  // --- MÉTODOS DE CONTROL ---

  // Actualiza datos parciales del reporte en curso
  actualizarReporte(data: Partial<Reporte>) {
    this.reporteStore.next({ ...this.reporteStore.value, ...data });
  }

  // Cambia la pantalla/paso actual
  setStep(nuevoPaso: PasoFlujo) {
    this.pasoActual.next(nuevoPaso);
  }

  // Devuelve el valor actual sin suscribirse (útil para lógica interna)
  getReporteActual() {
    return this.reporteStore.value;
  }

  // Obtiene el paso actual
  obtenerPasoActual(): PasoFlujo {
    return this.pasoActual.value;
  }

  // --- MÉTODOS PARA EL INFO-PANEL ---

  seleccionarReporte(reporte: Reporte) {
    this.reporteSeleccionado.next(reporte);
  }

  deseleccionarReporte() {
    this.reporteSeleccionado.next(null);
  }

  // =========================================================
  // [IMPORTANTE]: AQUÍ ESTÁ LA SIMULACIÓN DE GUARDADO
  // =========================================================
  guardarReporteFinal() {
    // 1. Tomamos los datos que el usuario llenó
    const data = this.reporteStore.value;

    // 2. Creamos un reporte "Final" simulando datos del Backend
    const nuevoReporte: Reporte = {
      ...data,
      id: Math.floor(Math.random() * 10000), // Generamos ID al azar
      fecha: new Date().toISOString(),       // Ponemos la fecha de hoy
      usuario: 'Yo (Demo)'                   // Usuario simulado
    };

    // 3. Obtenemos los reportes que ya existían en el mapa
    const reportesActuales = this.reportesComunitarios.value;

    // 4. Agregamos el nuevo y notificamos a todos (El mapa se actualizará solo)
    this.reportesComunitarios.next([...reportesActuales, nuevoReporte]);

    // 5. Reseteamos el formulario para el próximo reporte
    this.reporteStore.next(this.reporteInicial);
    
    console.log("✅ Reporte guardado y enviado al mapa:", nuevoReporte);
  }
}