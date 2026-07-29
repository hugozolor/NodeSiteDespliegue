export interface TipoPin {
    id: string;
    nombre: string;     // Ej: "Obra Vial", "Corte de Luz"
    iconoUrl: string;   // La imagen del icono
    esPredeterminado?: boolean; // Para saber si es el icono por defecto
}