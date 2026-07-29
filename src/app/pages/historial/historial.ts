import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header';
import { NavBottomComponent } from '../../components/nav-bottom/nav-bottom';

interface BasePost {
  id: string;
  fecha: Date;
}

interface Pin extends BasePost {
  ubicacionNombre: string;
  tipo: string; 
  descripcion: string;
  imagenes: string[]; 
  iconoPath: string; 
}

interface Review extends BasePost {
  barrio: string;
  calificacion: number; 
  descripcion: string;
  icono: string; 
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, NavBottomComponent],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class HistorialComponent implements OnInit {
  activeTab: 'pines' | 'resenas' = 'pines';
  isFilterOpen: boolean = false;
  filtroActivo: 'recientes' | 'antiguos' = 'recientes';
  expandedDescriptions: Set<string> = new Set();

  // Diccionario para controlar el índice de la foto activa en cada carrusel
  carouselIndices: { [key: string]: number } = {};

  pinesHistorial: Pin[] = [
    {
      id: 'p1',
      fecha: new Date('2026-05-12T10:30:00'),
      ubicacionNombre: 'Av. San Martín 1200',
      tipo: 'Bache',
      descripcion: 'Bache profundo en el carril derecho. Genera mucho tráfico y puede dañar vehículos si no se ve de noche. Requiere atención urgente por parte del municipio porque ya hubo dos accidentes esta misma semana en este punto exacto.',
      imagenes: [
        'https://picsum.photos/id/1015/300/300', 
        'https://picsum.photos/id/1016/300/300', 
        'https://picsum.photos/id/1018/300/300'
      ],
      iconoPath: 'assets/icons/bache-premium.svg'
    },
    {
      id: 'p2',
      fecha: new Date('2026-05-09T15:00:00'),
      ubicacionNombre: 'Plaza Principal',
      tipo: 'Alumbrado',
      descripcion: 'Dos luminarias apagadas en el sector de juegos infantiles.',
      imagenes: [
        'https://picsum.photos/id/1022/300/300',
        'https://picsum.photos/id/1023/300/300'
      ],
      iconoPath: 'assets/icons/alumbrado-premium.svg'
    }
  ];

  resenasHistorial: Review[] = [
    {
      id: 'r1',
      fecha: new Date('2026-05-15T09:15:00'),
      barrio: 'Barrio Norte',
      calificacion: 5,
      descripcion: 'La seguridad ha mejorado muchísimo en los últimos meses. Muy tranquilo para caminar de noche gracias a la nueva iluminación led.',
      icono: 'location_city' 
    },
    {
      id: 'r2',
      fecha: new Date('2026-04-20T11:45:00'),
      barrio: 'Barrio Centro',
      calificacion: 3,
      descripcion: 'Calles pintorescas y muy limpias, pero el tráfico en hora pico es un caos total. Se necesita mejor control vehicular.',
      icono: 'holiday_village' 
    }
  ];

  ngOnInit() {
    this.ordenarHistorial();
  }

  setTab(tab: 'pines' | 'resenas') {
    this.activeTab = tab;
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  seleccionarFiltro(filtro: 'recientes' | 'antiguos') {
    this.filtroActivo = filtro;
    this.isFilterOpen = false;
    this.ordenarHistorial();
  }

  ordenarHistorial() {
    const orden = this.filtroActivo === 'recientes' ? -1 : 1;
    this.pinesHistorial.sort((a, b) => (a.fecha.getTime() - b.fecha.getTime()) * orden);
    this.resenasHistorial.sort((a, b) => (a.fecha.getTime() - b.fecha.getTime()) * orden);
  }

  toggleDescription(id: string) {
    if (this.expandedDescriptions.has(id)) {
      this.expandedDescriptions.delete(id);
    } else {
      this.expandedDescriptions.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedDescriptions.has(id);
  }

  getArrayEstrellas(calificacion: number): number[] {
    return Array(5).fill(0).map((_, i) => i < calificacion ? 1 : 0);
  }

  // Detecta el desplazamiento horizontal del carrusel y actualiza el puntito activo
  onCarouselScroll(event: Event, pinId: string) {
    const element = event.target as HTMLElement;
    // Dividimos lo desplazado por el ancho de la caja (100px) para saber qué foto está al frente
    const currentIndex = Math.round(element.scrollLeft / 100);
    this.carouselIndices[pinId] = currentIndex;
  }

  // Obtiene el índice activo actual (por defecto 0)
  getActivePhotoIndex(pinId: string): number {
    return this.carouselIndices[pinId] || 0;
  }

  get hasContent(): boolean {
    return this.activeTab === 'pines' ? this.pinesHistorial.length > 0 : this.resenasHistorial.length > 0;
  }
}