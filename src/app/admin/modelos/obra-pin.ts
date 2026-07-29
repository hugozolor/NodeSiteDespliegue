export interface ObraPin {
  id?: string;
  titulo: string; // Título para Admin, o descripción corta para Usuario
  descripcion: string;
  tipoObra: string; // Debe coincidir con el 'nombre' en tipo-pin
  
  // Coordenadas
  latitud: number;
  longitud: number;
  
  // Metadatos
  origen: 'admin' | 'usuario'; // CLAVE para distinguir lógica
  usuario?: string; // Solo si origen === 'usuario'
  estado: 'en-progreso' | 'finalizada';
  
  // Multimedia
  imagenes: string[]; // Array de URLs (antes era solo una string)
  
  // Fechas
  fechaInicio: Date;
  fechaExpiracion: Date;
}