import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModeracionAdminService } from '../../servicios/moderacion-admin'; // Importamos tu servicio

@Component({
  selector: 'app-advertencia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './advertencia.html',
  styleUrls: ['./advertencia.css']
})
export class AdvertenciaComponent implements OnInit {
  searchTerm: string = '';
  usuarioEncontrado: any = null;
  mostrarModalReporte: boolean = false;
  
  sancion: any = {
    tipo: 'INFO',
    titulo: '',
    mensaje: '',
    quitarBeneficios: false
  };

  constructor(private moderacionService: ModeracionAdminService) {}

  ngOnInit(): void {}

  buscarUsuario() {
    const term = this.searchTerm.trim().toLowerCase();
    
    // Simulación de búsqueda por Nombre de Usuario (Username)
    // En producción, aquí llamarías a un método de tu servicio: this.moderacionService.buscarPorUsername(term)
    if (term === 'admin' || term === 'usuario_test') {
      this.usuarioEncontrado = {
        username: term,
        nombreReal: 'José Pérez',
        email: 'jose@mail.com',
        pines: [
          { id: 'p1', tipo: 'Vial', mensaje: 'Calle rota en Av. Siempre Viva', fecha: '2024-05-10', foto: 'assets/bache.jpg' }
        ],
        resenas: [
          { id: 'r1', barrio: 'San Remo', comentario: 'Mucha basura en la esquina', estrellas: 2 }
        ]
      };
    } else {
      this.usuarioEncontrado = null;
      alert('Nombre de usuario no encontrado.');
    }
  }

  abrirReporte() {
    this.mostrarModalReporte = true;
  }

  cerrarReporte() {
    this.mostrarModalReporte = false;
    this.sancion = { tipo: 'INFO', titulo: '', mensaje: '', quitarBeneficios: false };
  }

  enviarSancion() {
    // Validamos que haya título y mensaje
    if (!this.sancion.titulo || !this.sancion.mensaje) return;

    // 1. Simular envío al backend
    const payload = {
      usuarioId: this.usuarioEncontrado.username,
      ...this.sancion
    };
    console.log('Enviando reporte:', payload);

    // ---------------------------------------------------------
    // 2. ESTA ES LA LÍNEA QUE FALTA PARA QUE SUBA EL CONTADOR:
    this.moderacionService.incrementarContador(); 
    // ---------------------------------------------------------

    // 3. Feedback al usuario y cerrar
    alert(`Reporte enviado a @${this.usuarioEncontrado.username}`);
    this.cerrarReporte();
  }
}