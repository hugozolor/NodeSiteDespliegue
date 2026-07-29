export interface Review {
  // --- NUEVOS CAMPOS NECESARIOS ---
  id?: string;        // Vital para identificar qué reseña eliminar/editar
  nombreBarrio?: string; // Para mostrarlo rápido en la tabla del admin sin buscar ID
  usuarioNombre?: string; // Para mostrar "Juan Perez" en lugar de un ID raro
  estado?: 'publicada' | 'moderada' | 'eliminada'; // Para control del Admin

  barrioId: string;
  usuarioId: string;
  calificacion: number;
  comentario: string;
  fecha: Date;
}