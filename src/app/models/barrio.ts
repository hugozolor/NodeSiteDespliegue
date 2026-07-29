export interface Barrio {
  id: string;
  nombre: string;
  puntuacionGeneral: number;
  activo?: boolean; // Opcional (true por defecto)
}