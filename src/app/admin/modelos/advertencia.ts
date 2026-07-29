export interface ReporteSancion {
  tipo: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  titulo: string;
  mensaje: string;
  quitarBeneficios: boolean; // Solo para Warning
}