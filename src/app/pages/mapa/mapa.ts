import { Component, AfterViewInit, OnDestroy, OnInit, inject, ChangeDetectorRef, EnvironmentInjector, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReporteService } from '../../services/reporte'; 
import { MapaUbicacionComponent } from '../../components/publicar/mapa-ubicacion/mapa-ubicacion';
import { InfoPanelComponent } from '../../components/publicar/info-panel/info-panel';
import { Reporte } from '../../models/reporte';
import { HeaderComponent } from '../../components/header/header';
import { MapaGlobalService, PinRender } from '../../services/mapa-global';
import { PopupPinComponent } from '../../admin/componentes/popup-pin/popup-pin';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MapaUbicacionComponent, HeaderComponent],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css'
})
export class MapaComponent implements OnInit, AfterViewInit, OnDestroy {
  public reporteService = inject(ReporteService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private mapaGlobal = inject(MapaGlobalService);
  private injector = inject(EnvironmentInjector);

  private map!: maplibregl.Map;
  private marcadoresEnMapa: maplibregl.Marker[] = [];
  private marcadorTemporal?: maplibregl.Marker;
  
  // NUEVO: Almacena la referencia del popup que se encuentra visible actualmente
  private popupAbierto?: maplibregl.Popup;

  // Almacén en memoria preparado para el futuro
  private todosLosPines: PinRender[] = [];

  private temaClaro = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
  private temaOscuro = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
  public esModoOscuro = false;

  public reporteSeleccionado: Reporte | null = null;
  public panelVisible = true; 
  public modoSeleccion: boolean = false;
  public filtroVisible: boolean = false;
  public categoriaSeleccionada: string = 'Todas';
  public categorias: Array<{id: number, nombre: string}> = [];

  private defaultPinSvg = `
    <svg viewBox="0 0 24 24" width="40" height="40" fill="#dc2626" stroke="#ffffff" stroke-width="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  ngOnInit() {
    this.cargarCategorias();
    this.reporteService.reporteSeleccionado$.subscribe(reporte => {
      this.reporteSeleccionado = reporte;
      this.panelVisible = !reporte; 
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.inicializarMapa();
    this.mapaGlobal.obtenerPines().subscribe(pinesGlobales => {
       if (this.map) {
         this.todosLosPines = pinesGlobales;
         this.aplicarFiltros();
       }
    });

    // Detectar cambios de clase en el body para el modo oscuro (sincronizado con el Header)
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark-mode');
      if (this.esModoOscuro !== isDark) {
        this.esModoOscuro = isDark;
        this.map.setStyle(this.esModoOscuro ? this.temaOscuro : this.temaClaro);
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy() {
    if (this.map) this.map.remove();
  }

  private cargarCategorias() {
    this.categorias = [
      { id: 1, nombre: 'Basura / Limpieza' },
      { id: 2, nombre: 'Baches / Calles' },
      { id: 3, nombre: 'Tránsito' },
      { id: 4, nombre: 'Alumbrado' },
      { id: 5, nombre: 'Espacios Públicos' },
      { id: 6, nombre: 'Denuncias' },
      { id: 7, nombre: 'Otros' }
    ];
  }

  private inicializarMapa() {
    const limitesSalta: [maplibregl.LngLatLike, maplibregl.LngLatLike] = [
      [-68.5835, -26.3986],
      [-62.3421, -22.0298] 
    ];

    // Verifica si el body ya tiene la clase dark-mode al cargar
    this.esModoOscuro = document.body.classList.contains('dark-mode');

    this.map = new maplibregl.Map({
      container: 'map-container',
      style: this.esModoOscuro ? this.temaOscuro : this.temaClaro,
      center: [-65.4232, -24.7821], 
      zoom: 14,
      minZoom: 6,
      maxBounds: limitesSalta
    });

    this.verificarBorradorPendiente();

    this.map.on('click', (e) => {
      const pasoActual = this.reporteService.obtenerPasoActual ? this.reporteService.obtenerPasoActual() : 'INICIO';
      if (this.modoSeleccion || pasoActual === 'MAPA') {
        this.colocarMarcadorTemporal(e.lngLat.lat, e.lngLat.lng);
      } else {
        this.cerrarDetalles();
      }
    });
  }

  private aplicarFiltros() {
    this.dibujarPinesGlobales(this.todosLosPines);
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  private verificarBorradorPendiente() {
    const borrador = this.mapaGlobal.obtenerBorrador();
    if (borrador) this.modoSeleccion = true;
  }

  private dibujarPinesGlobales(pines: PinRender[]) {
    this.marcadoresEnMapa.forEach(m => m.remove());
    this.marcadoresEnMapa = [];
    
    // Si se redibujan los pines, nos aseguramos de limpiar la referencia del popup activo
    this.popupAbierto = undefined;

    if (!pines || pines.length === 0) return;

    pines.forEach(pin => {
      const el = document.createElement('div');
      el.className = pin.esAdmin ? 'pin-oficial custom-pin-wrapper' : 'pin-ciudadano custom-pin-wrapper';
      
      el.innerHTML = (pin as any).iconoSvg ? (pin as any).iconoSvg : this.defaultPinSvg; 
      
      const componentRef = createComponent(PopupPinComponent, { environmentInjector: this.injector });
      componentRef.instance.pinData = pin; 
      componentRef.instance.soloLectura = true; 
      componentRef.changeDetectorRef.detectChanges();

      const popup = new maplibregl.Popup({ maxWidth: '300px', className: 'google-maps-popup', closeButton: false })
        .setDOMContent(componentRef.location.nativeElement);

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([pin.lng, pin.lat])
        .setPopup(popup)
        .addTo(this.map);

      // Centrar el mapa y controlar la apertura exclusiva de popups
      el.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        // CORRECCIÓN/REGLA DE EXCLUSIVIDAD: Si hay otro popup abierto diferente a este, lo cierra.
        if (this.popupAbierto && this.popupAbierto !== popup) {
          this.popupAbierto.remove();
        }
        
        this.map.flyTo({
          center: [pin.lng, pin.lat],
          zoom: 16,
          speed: 1.2,
          curve: 1.42,
          essential: true
        });

        // Alterna el estado del popup actual
        marker.togglePopup();

        // Actualiza cuál es el popup que se encuentra activo en memoria
        if (popup.isOpen()) {
          this.popupAbierto = popup;
        } else {
          this.popupAbierto = undefined;
        }
      });

      this.marcadoresEnMapa.push(marker);
    });
  }

  private colocarMarcadorTemporal(lat: number, lng: number) {
    if (this.marcadorTemporal) this.marcadorTemporal.remove();

    const el = document.createElement('div');
    el.className = 'anim-bounce custom-temp-pin';
    el.innerHTML = `
      <svg viewBox="0 0 24 24" width="48" height="48" fill="#005fa3" stroke="#ffffff" stroke-width="2" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.4));">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;

    this.marcadorTemporal = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.reporteService.actualizarReporte({ ubicacion: { lat, lng } });
  }

  cerrarDetalles() {
    this.reporteService.deseleccionarReporte();
  }

  finalizarTodo() {
    this.reporteService.guardarReporteFinal();
    if (this.marcadorTemporal) {
      const lngLat = this.marcadorTemporal.getLngLat();
      this.mapaGlobal.confirmarPublicacion(lngLat.lat, lngLat.lng);
      this.marcadorTemporal.remove();
      this.marcadorTemporal = undefined;
    }
    this.modoSeleccion = false;
    this.reporteService.setStep('SELECCION_PIN' as any);
    this.panelVisible = true;
  }

  cancelarSeleccion() {
    if (this.marcadorTemporal) {
      this.marcadorTemporal.remove();
      this.marcadorTemporal = undefined;
    }
    this.mapaGlobal.limpiarBorrador();
    this.modoSeleccion = false;
    this.reporteService.setStep('SELECCION_PIN' as any);
    this.panelVisible = true;
  }

  toggleFiltro() {
    this.filtroVisible = !this.filtroVisible;
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}