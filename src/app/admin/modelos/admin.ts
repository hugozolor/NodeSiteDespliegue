export interface Admin {
    id: string;
    nombre: string;
    usuario: string;
    email: string;
    token?: string; // El "pase" de seguridad que te da el servidor
    ultimoAcceso: Date;
}