import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Asegúrate de que estas rutas coincidan exactamente con la estructura de tus carpetas
import { DatosCompartidosService } from '../../../services/datos-compartidos';
import { Review } from '../../../models/review'; 
import { AdminFooterComponent } from '../../componentes/admin-footer/admin-footer';
import { MenuLateralComponent } from '../../componentes/menu-lateral/menu-lateral';
import { CabeceraAdminComponent } from '../../componentes/cabecera-admin/cabecera-admin';
import { LayoutService } from '../../servicios/layout.service';

@Component({
  selector: 'app-gestion-resenas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    MenuLateralComponent, 
    CabeceraAdminComponent, 
    AdminFooterComponent
  ],
  templateUrl: './gestion-resenas.html',
  styleUrls: ['./gestion-resenas.css']
})
export class GestionResenasComponent implements OnInit {
  listaResenas: Review[] = [];
  
  // Controladores de UI existentes
  panelFiltrosAbierto: boolean = false;
  panelKpiAbierto: boolean = true;
  modoOscuro: boolean = false;
  
  // Filtros dinámicos existentes
  filtro: string = '';
  filtroEstrellas: string = '';
  filtroBarrio: string = '';
  ordenUsuarios: 'asc' | 'desc' | null = null;

  // Estados Locales Dinámicos existentes
  estadosLocales: { [id: string]: 'azul' | 'amarillo' | 'rojo' } = {};
  menuEstadoAbierto: string | null = null;

  // Variables de Paginación añadidas para soporte de la lógica interna
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private datosService: DatosCompartidosService,
    public layoutService: LayoutService // <- CORRECCIÓN 1: Inyectado como public para que el HTML pueda usar layoutService?.isDarkMode()
  ) {} 

  ngOnInit(): void {
    // CORRECCIÓN 2: Suscripción correcta al Observable de datos compartidos para rellenar la lista reactivamente
    this.datosService.reviews$.subscribe({
      next: (resenas) => {
        this.listaResenas = resenas;
      },
      error: (err) => {
        console.error('Error al obtener las reseñas desde el servicio:', err);
      }
    });
  }

  // --- GETTERS DE FILTRADO Y PAGINACIÓN ---
  get resenasFiltradas(): Review[] {
    let filtradas = [...this.listaResenas];

    if (this.filtro) {
      const f = this.filtro.toLowerCase();
      filtradas = filtradas.filter(r => 
        (r.usuarioNombre && r.usuarioNombre.toLowerCase().includes(f)) ||
        (r.comentario && r.comentario.toLowerCase().includes(f))
      );
    }

    if (this.filtroEstrellas) {
      filtradas = filtradas.filter(r => r.calificacion === +this.filtroEstrellas);
    }

    if (this.filtroBarrio) {
      filtradas = filtradas.filter(r => r.nombreBarrio === this.filtroBarrio);
    }

    if (this.ordenUsuarios) {
      filtradas.sort((a, b) => {
        const nameA = (a.usuarioNombre || '').toLowerCase();
        const nameB = (b.usuarioNombre || '').toLowerCase();
        if (this.ordenUsuarios === 'asc') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      });
    }

    return filtradas;
  }

  get paginatedResenas(): Review[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.resenasFiltradas.slice(startIndex, startIndex + this.itemsPerPage);
}

  get totalPages(): number {
    const total = Math.ceil(this.resenasFiltradas.length / this.itemsPerPage);
    return total === 0 ? 1 : total; 
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // --- LÓGICA DE INTERFAZ Y ESTADOS ---
  toggleOrdenUsuario() {
    if (this.ordenUsuarios === 'asc') this.ordenUsuarios = 'desc';
    else if (this.ordenUsuarios === 'desc') this.ordenUsuarios = null;
    else this.ordenUsuarios = 'asc';
  }

  getEstado(id: string): 'azul' | 'amarillo' | 'rojo' {
    return this.estadosLocales[id] || 'azul'; 
  }

  toggleMenuEstado(id: string) {
    this.menuEstadoAbierto = this.menuEstadoAbierto === id ? null : id;
  }

  cambiarEstado(id: string, nuevoEstado: 'azul' | 'amarillo' | 'rojo') {
    this.estadosLocales[id] = nuevoEstado;
    this.menuEstadoAbierto = null;
  }

  cerrarMenus() {
    this.menuEstadoAbierto = null;
  }

  // CORRECCIÓN 3: Añadido el método solicitado por el HTML para eliminar un comentario sin romper la ejecución
  eliminarComentario(id: string) {
    // Si tu servicio compartido ya dispone de un método de eliminación masiva/asíncrona, lo llamamos:
    if (typeof (this.datosService as any).eliminarReview === 'function') {
      (this.datosService as any).eliminarReview(id);
    } else {
      // Alternativa local/mock en caso de que el archivo de prueba no lo tenga implementado todavía
      this.listaResenas = this.listaResenas.filter(resena => resena.id !== id);
    }
  }

  // Indicadores KPI reactivos a los estados dinámicos
  get kpiTotal(): number { 
    return this.listaResenas.length; 
  }
}