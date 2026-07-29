export interface Noticia {
    id: string;
    titulo: string;
    contenido: string;
    tipo: 'noticia' | 'importante'; // Para diferenciar el color/estilo en el carrusel
    fecha: Date;
}