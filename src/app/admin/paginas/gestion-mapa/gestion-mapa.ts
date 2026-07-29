import { Component, OnInit, AfterViewInit, OnDestroy, EnvironmentInjector, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

// REEMPLAZO: MapLibre en lugar de Leaflet
import maplibregl from 'maplibre-gl';

// SERVICIOS
import { MapaAdminService } from '../../servicios/mapa-admin';
import { ConfiguracionPinesService } from '../../servicios/configuracion-pines';

// SERVICIO GLOBAL
import { MapaGlobalService, PinRender } from '../../../services/mapa-global';

// MODELOS
import { ObraPin } from '../../modelos/obra-pin';
import { TipoPin } from '../../modelos/tipo-pin';

// COMPONENTE POPUP
import { PopupPinComponent } from '../../componentes/popup-pin/popup-pin';

@Component({
  selector: 'app-gestion-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestion-mapa.html',
  styleUrls: ['./gestion-mapa.css']
})
export class GestionMapaComponent implements OnInit, AfterViewInit, OnDestroy {
  // --- VARIABLES DEL MAPA (Adaptadas a MapLibre) ---
  private map!: maplibregl.Map;
  markers: maplibregl.Marker[] = [];
  tiposDisponibles: TipoPin[] = [];

  // Cache para recuperar datos al editar
  pinesCache: ObraPin[] = [];

  // --- VARIABLES DEL FORMULARIO (ADMIN) ---
  unidadTiempo: 'horas' | 'dias' | 'semanas' = 'dias';
  cantidadTiempo: number = 1;
  nuevoPin: ObraPin = this.resetForm();
  
  // Control de estado de edición
  modoEdicion: boolean = false;
  
  // Para previsualizar la foto antes de subirla
  imagenPreviewUrl: string | null = null;

  constructor(
    private mapaService: MapaAdminService,
    private configPines: ConfiguracionPinesService,
    private mapaGlobal: MapaGlobalService, 
    private injector: EnvironmentInjector 
  ) {}

  // =========================================================
  // 1. CICLO DE VIDA
  // =========================================================

  ngOnInit(): void {
    this.configPines.tipos$.subscribe(tipos => {
      this.tiposDisponibles = tipos;
      if (tipos.length > 0 && !this.nuevoPin.tipoObra) {
        this.nuevoPin.tipoObra = tipos[0].nombre;
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.cargarPinesGlobales();
  }

  // Limpieza del mapa al destruir el componente
  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }

  // =========================================================
  // 2. LÓGICA DEL MAPA (MAPLIBRE)
  // =========================================================

  private initMap(): void {
    // Inicialización del contenedor con el estilo Voyager de CARTO
    this.map = new maplibregl.Map({
      container: 'map-admin',
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [-65.4117, -24.7859], // IMPORTANTE MapLibre usa [Longitud, Latitud]
      zoom: 13
    });

    // Control de zoom nativo en la esquina inferior derecha
    this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // CLICK EN EL MAPA: Mueve las coordenadas del formulario (Mantiene tu lógica)
    this.map.on('click', (e) => {
      this.nuevoPin.latitud = e.lngLat.lat;
      this.nuevoPin.longitud = e.lngLat.lng;
    });
  }

  cargarPinesGlobales() {
    this.mapaGlobal.obtenerPines().subscribe(pines => {
      // Limpiamos marcadores usando el método remove() de MapLibre
      this.markers.forEach(m => m.remove());
      this.markers = [];

      pines.forEach(pinRender => {
        this.dibujarPinRender(pinRender);
      });
    });
  }

  dibujarPinRender(pin: PinRender) {
    // 1. Crear elemento HTML personalizado para el marcador
    const el = document.createElement('div');
    el.className = pin.esAdmin ? 'pin-admin-effect' : 'pin-user-effect';
    el.style.backgroundImage = `url(${pin.iconoUrl || 'assets/icons/default-pin.png'})`;
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'cover';
    el.style.cursor = 'pointer';

    // 2. Componente Angular Dinámico (Mismo comportamiento)
    const componentRef = createComponent(PopupPinComponent, {
      environmentInjector: this.injector
    });
    
    componentRef.instance.pinData = pin;

    // Escuchamos evento eliminar (El admin sí puede hacerlo)
    componentRef.instance.eliminar.subscribe((id) => this.borrarPin(id));

    componentRef.changeDetectorRef.detectChanges();

    // 3. Crear Popup de MapLibre e incrustar el HTML de Angular
    const popup = new maplibregl.Popup({ 
      maxWidth: '300px',
      className: 'google-maps-popup', 
      closeButton: false 
    }).setDOMContent(componentRef.location.nativeElement);

    // 4. Crear e Instanciar el Marcador en formato [Lng, Lat]
    const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([pin.lng, pin.lat])
      .setPopup(popup)
      .addTo(this.map);

    this.markers.push(marker);
  }

  // Conservado y adaptado a MapLibre por si lo usas de respaldo local
  cargarPinesDelMapa() {
    this.mapaService.obtenerPines().subscribe(pines => {
      this.pinesCache = pines;
    });
  }

  // LEGACY REESCRITO: Dibuja un pin local de tipo ObraPin con MapLibre
  dibujarPin(pin: ObraPin) {
    const tipoInfo = this.tiposDisponibles.find(t => t.nombre === pin.tipoObra);
    
    const el = document.createElement('div');
    el.className = pin.origen === 'usuario' ? 'pin-user-effect' : 'pin-admin-effect';
    el.style.backgroundImage = `url(${tipoInfo?.iconoUrl || 'assets/icons/default-pin.png'})`;
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'cover';
    el.style.cursor = 'pointer';

    const componentRef = createComponent(PopupPinComponent, { environmentInjector: this.injector });
    componentRef.instance.pin = pin;
    componentRef.instance.eliminar.subscribe((id) => this.borrarPin(id));
    componentRef.instance.editar.subscribe((id) => this.editarPin(id));
    componentRef.changeDetectorRef.detectChanges();

    const popup = new maplibregl.Popup({ 
      maxWidth: '300px', 
      className: 'google-maps-popup', 
      closeButton: false 
    }).setDOMContent(componentRef.location.nativeElement);

    const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([pin.longitud, pin.latitud]) // [Lng, Lat]
      .setPopup(popup)
      .addTo(this.map);

    this.markers.push(marker);
  }

  // =========================================================
  // 3. LÓGICA DEL FORMULARIO (ADMIN) - CONSERVADA AL 100%
  // =========================================================

  onFileSelected(event: any) {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const nuevasFotos: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        nuevasFotos.push(url);
      }
      this.nuevoPin.imagenes = nuevasFotos.slice(0, 3);
      
      if (files.length > 3) {
        alert('Solo se permiten máximo 3 fotos. Se han seleccionado las primeras 3.');
      }
    }
  }

  guardarObra() {
    if (this.nuevoPin.latitud === 0 && this.nuevoPin.longitud === 0) {
      alert('Por favor, selecciona una ubicación en el mapa.');
      return;
    }

    if (!this.modoEdicion) {
      this.nuevoPin.id = Date.now().toString();
      this.nuevoPin.fechaInicio = new Date();
    }
    
    const fechaExp = new Date();
    if (this.unidadTiempo === 'horas') fechaExp.setHours(fechaExp.getHours() + this.cantidadTiempo);
    if (this.unidadTiempo === 'dias') fechaExp.setDate(fechaExp.getDate() + this.cantidadTiempo);
    if (this.unidadTiempo === 'semanas') fechaExp.setDate(fechaExp.getDate() + (this.cantidadTiempo * 7));
    
    this.nuevoPin.fechaExpiracion = fechaExp;

    const tipoInfo = this.tiposDisponibles.find(t => t.nombre === this.nuevoPin.tipoObra);
    
    const pinParaGlobal: PinRender = {
      id: this.nuevoPin.id!,
      lat: this.nuevoPin.latitud,
      lng: this.nuevoPin.longitud,
      tipo: this.nuevoPin.tipoObra,
      iconoUrl: tipoInfo?.iconoUrl || 'assets/icons/pin.webp',
      descripcion: this.nuevoPin.descripcion,
      imagenes: this.nuevoPin.imagenes,
      usuario: 'Municipalidad', 
      esAdmin: true,
      fecha: this.nuevoPin.fechaInicio
    };

    this.mapaGlobal.agregarPinAdmin(pinParaGlobal);

    this.mapaService.crearPin({...this.nuevoPin}).subscribe(pinGuardado => {
      if (pinGuardado.estado === 'en-progreso' && !this.modoEdicion) {
        this.mapaService.incrementarContadorObras();
      }
      
      const mensaje = this.modoEdicion ? 'Obra actualizada correctamente.' : 'Pin publicado correctamente (Visible para todos).';
      alert(mensaje);
      
      this.cancelarEdicion(); 
    });
  }

  // =========================================================
  // 4. ACCIONES DEL POPUP Y EDICIÓN
  // =========================================================

  borrarPin(id: string) {
    if(confirm('¿Seguro que deseas eliminar este reporte del mapa GLOBAL?')) {
      this.mapaGlobal.eliminarPin(id);
      this.mapaService.eliminarPin(id).subscribe(() => {
        // El mapa se actualizará solo gracias al observable global
      });
    }
  }

  editarPin(id: string) {
    const pinEncontrado = this.pinesCache.find(p => p.id === id);

    if (pinEncontrado) {
      this.nuevoPin = { ...pinEncontrado };
      this.modoEdicion = true;
      
      // Adaptación MapLibre para mover la vista del mapa [Lng, Lat]
      this.map.jumpTo({
        center: [pinEncontrado.longitud, pinEncontrado.latitud],
        zoom: 15
      });
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.nuevoPin = this.resetForm();
  }

  private resetForm(): ObraPin {
    const tipoActual = this.nuevoPin ? this.nuevoPin.tipoObra : '';
    return {
      titulo: '',
      descripcion: '',
      tipoObra: tipoActual,
      origen: 'admin',
      estado: 'en-progreso',
      latitud: 0,
      longitud: 0,
      imagenes: [],
      fechaInicio: new Date(),
      fechaExpiracion: new Date()
    };
  }
}