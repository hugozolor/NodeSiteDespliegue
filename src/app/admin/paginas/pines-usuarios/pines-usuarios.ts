import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Servicios de Datos y Layout
import { MapaGlobalService, TipoPin } from '../../../services/mapa-global';
import { DatosCompartidosService } from '../../../services/datos-compartidos'; 
import { LayoutService } from '../../servicios/layout.service';
import { Barrio } from '../../../models/barrio';

// Componentes Reutilizables
import { MenuLateralComponent } from '../../componentes/menu-lateral/menu-lateral';
import { CabeceraAdminComponent } from '../../componentes/cabecera-admin/cabecera-admin';

@Component({
  selector: 'app-pines-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuLateralComponent, CabeceraAdminComponent],
  templateUrl: './pines-usuarios.html',
  styleUrls: ['./pines-usuarios.css']
})
export class PinesUsuariosComponent implements OnInit {
  listaPines: TipoPin[] = [];
  listaBarrios: Barrio[] = [];

  activeTab: 'pines' | 'barrios' = 'pines';

  // Estados
  editandoPinId: string | null = null;
  editandoBarrioId: string | null = null;

  nuevoPin: Partial<TipoPin> = { nombre: '', iconoUrl: '' };
  nuevoBarrioNombre: string = '';

  constructor(
    private mapaGlobal: MapaGlobalService,
    private datosService: DatosCompartidosService,
    public layoutService: LayoutService, // Inyectamos el servicio público para usarlo en la plantilla
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.mapaGlobal.obtenerTiposPines().subscribe(data => {
      this.listaPines = data;
      this.cdr.detectChanges();
    });
    this.datosService.barrios$.subscribe(data => {
      this.listaBarrios = data;
      this.cdr.detectChanges();
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { 
        this.nuevoPin.iconoUrl = e.target.result; 
        this.cdr.detectChanges(); 
      };
      reader.readAsDataURL(file);
    }
  }

  guardarPin() {
    if (!this.nuevoPin.nombre) return;
    
    if (this.editandoPinId) {
      alert('Edición pendiente');
    } else {
      const pin: TipoPin = {
        id: Date.now().toString(),
        nombre: this.nuevoPin.nombre!,
        iconoUrl: this.nuevoPin.iconoUrl || 'public/icons/pin.webp'
      };
      
      this.mapaGlobal.agregarTipoPin(pin);
    }
    this.resetFormPin();
  }
  
  eliminarPin(id: string) { 
    this.mapaGlobal.eliminarTipoPin(id); 
  }

  prepararEdicionPin(pin: TipoPin) { 
    this.editandoPinId = pin.id;
    this.nuevoPin = { ...pin };
  }

  resetFormPin() { 
    this.nuevoPin = { nombre: '', iconoUrl: '' }; 
    this.editandoPinId = null; 
  }

  guardarBarrio() {
    if (!this.nuevoBarrioNombre) return;
    if (this.editandoBarrioId) { alert('Edición pendiente'); } 
    else { this.datosService.agregarBarrio(this.nuevoBarrioNombre); }
    this.resetFormBarrio();
  }

  eliminarBarrio(id: string) { this.datosService.eliminarBarrio(id); }

  prepararEdicionBarrio(barrio: Barrio) {
    this.editandoBarrioId = barrio.id;
    this.nuevoBarrioNombre = barrio.nombre;
  }

  resetFormBarrio() {
    this.nuevoBarrioNombre = '';
    this.editandoBarrioId = null;
  }
}