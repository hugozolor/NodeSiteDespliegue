export interface TipoPin {
  id: string;
  nombre: string;
  icono?: string;
  iconoArchivo: string; 
  color: string;
  // Añadimos esta para que el mapa sepa qué imagen renderizar luego
  iconoCompleto?: string; 
}

export interface Reporte {
  id?: number; // El Backend lo generará automáticamente (null al crear)
  tipoPin: TipoPin | null;
  descripcion: string;
  fotos: string[]; // Base64 para el envío, URLs tras guardado
  ubicacion?: {
    lat: number;
    lng: number;
  };
  usuarioId?: string; // ID del usuario que reporta
  usuario: string;    // Nombre para mostrar
  fecha: string;      // ISO String
}

// Estados del flujo para controlar qué se muestra en la pantalla
export type PasoFlujo = 'SELECCION_PIN' | 'DETALLES' | 'CONFIRMACION' | 'MAPA' | 'EXITO';