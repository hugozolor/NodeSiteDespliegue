import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Noticia } from '../../modelos/noticia';
import { NoticiasAppService } from '../../../servicios/noticias-app';

import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../servicios/layout.service'; 
import { MenuLateralComponent } from '../../componentes/menu-lateral/menu-lateral';
import { CabeceraAdminComponent } from '../../componentes/cabecera-admin/cabecera-admin';

@Component({
  selector: 'app-notificaciones-app',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    MatIconModule, 
    MenuLateralComponent, 
    CabeceraAdminComponent
  ],
  templateUrl: './notificaciones-app.html',
  styleUrls: ['./notificaciones-app.css']
})
export class NotificacionesAppComponent implements OnInit {
  
  listaNoticias: Noticia[] = [];
  
  // HISTORIAL DE DATOS ARCHIVADOS (Simulado para el funcionamiento del segundo filtro)
  listaHistorial: Noticia[] = [
    {
      id: 'h1',
      titulo: 'Corte de Energía Programado',
      contenido: 'Mantenimiento general preventivo en el nodo norte del centro administrativo de la ciudad.',
      tipo: 'noticia',
      fecha: new Date('2026-05-12T08:00:00')
    },
    {
      id: 'h2',
      titulo: 'Fallo Crítico de Servidor de Mapas',
      contenido: 'Alerta general por interrupción temporal en la carga de capas catastrales del bacheo público.',
      tipo: 'importante',
      fecha: new Date('2026-05-10T14:30:00')
    }
  ];
  
  // Variables controladoras de filtrado dinámico
  filtroCategoria: string = 'todos';
  filtroHistorial: string = 'todos';

  nuevaNoticia: Partial<Noticia> = {
    titulo: '',
    contenido: '',
    tipo: 'noticia'
  };

  editandoId: string | null = null;
  isModalOpen: boolean = false;

  constructor(
    private noticiasService: NoticiasAppService,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.noticiasService.obtenerNoticias().subscribe(data => {
      this.listaNoticias = data;
    });
  }

  // GETTER: Filtra en tiempo real la tabla de noticias activas
  get noticiasFiltradas(): Noticia[] {
    if (this.filtroCategoria === 'todos') {
      return this.listaNoticias;
    }
    return this.listaNoticias.filter(n => n.tipo === this.filtroCategoria);
  }

  // GETTER: Filtra en tiempo real la tabla de historial
  get historialFiltrado(): Noticia[] {
    if (this.filtroHistorial === 'todos') {
      return this.listaHistorial;
    }
    return this.listaHistorial.filter(n => n.tipo === this.filtroHistorial);
  }

  guardarNoticia() {
    if (!this.nuevaNoticia.titulo || !this.nuevaNoticia.contenido) return;

    if (this.editandoId) {
      const index = this.listaNoticias.findIndex(n => n.id === this.editandoId);
      if (index !== -1) {
        this.listaNoticias[index] = { 
          ...this.nuevaNoticia, 
          id: this.editandoId, 
          fecha: new Date() 
        } as Noticia;
      }
    } else {
      const noticia: Noticia = {
        id: Date.now().toString(),
        titulo: this.nuevaNoticia.titulo!,
        contenido: this.nuevaNoticia.contenido!,
        tipo: this.nuevaNoticia.tipo as 'noticia' | 'importante',
        fecha: new Date()
      };
      this.noticiasService.publicarNoticia(noticia);
    }
    this.limpiarFormulario();
  }

  prepararEdicion(noticia: Noticia) {
    this.editandoId = noticia.id;
    this.nuevaNoticia = { ...noticia };
    this.isModalOpen = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarNoticia(id: string) {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id);
    }
  }

  eliminarHistorial(id: string) {
    if (confirm('¿Deseas remover de forma permanente este registro histórico?')) {
      this.listaHistorial = this.listaHistorial.filter(h => h.id !== id);
    }
  }

  limpiarFormulario() {
    this.nuevaNoticia = { titulo: '', contenido: '', tipo: 'noticia' };
    this.editandoId = null;
    this.isModalOpen = false;
  }
}