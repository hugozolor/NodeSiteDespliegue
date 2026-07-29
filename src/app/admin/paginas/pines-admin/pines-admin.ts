import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../servicios/layout.service';

// Módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes Reutilizables
import { MenuLateralComponent } from '../../componentes/menu-lateral/menu-lateral';
import { CabeceraAdminComponent } from '../../componentes/cabecera-admin/cabecera-admin';

// Servicios y Modelos
import { ConfiguracionPinesService } from '../../servicios/configuracion-pines';
import { TipoPin } from '../../modelos/tipo-pin';

@Component({
  selector: 'app-pines-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MenuLateralComponent,
    CabeceraAdminComponent
  ],
  templateUrl: './pines-admin.html',
  styleUrls: ['./pines-admin.css']
})
export class PinesAdminComponent implements OnInit {
  // Inyección de servicios usando inject() de Angular
  public layoutService = inject(LayoutService);
  
  // Estado y Colecciones
  listaTipos: TipoPin[] = [];
  nuevoTipo: Partial<TipoPin> = { nombre: '', iconoUrl: '' };
  archivoSeleccionado: File | null = null;
  
  iconoPorDefecto = 'icons/pin.webp'; 
  editandoId: string | null = null; 
  modoOscuro = false; 

  constructor(private pinesService: ConfiguracionPinesService) {}

  ngOnInit(): void {
    // Suscripción al flujo de datos de pines
    this.pinesService.tipos$.subscribe(datos => {
      this.listaTipos = datos;
    });
  }

  // Control local del tema oscuro para la vista
  toggleModoOscuro() {
    this.modoOscuro = !this.modoOscuro;
    document.body.classList.toggle('dark-theme');
  }

  // Procesamiento de imágenes cargadas localmente (Vista previa)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevoTipo.iconoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Guardar o Actualizar pines institucionales
  guardarTipo() {
    if (!this.nuevoTipo.nombre) return;

    if (!this.nuevoTipo.iconoUrl) {
      this.nuevoTipo.iconoUrl = this.iconoPorDefecto;
    }

    if (this.editandoId) {
      // Modo Edición
      this.pinesService.actualizarTipo(this.editandoId, this.nuevoTipo).subscribe(() => {
        this.resetForm();
      });
    } else {
      // Modo Creación
      const tipoAGuardar: TipoPin = {
        id: '',
        nombre: this.nuevoTipo.nombre || '',
        iconoUrl: this.nuevoTipo.iconoUrl || this.iconoPorDefecto
      };
      this.pinesService.agregarTipo(tipoAGuardar).subscribe(() => {
        this.resetForm();
      });
    }
  }

  // Cargar datos en el formulario para editar
  cargarEdicion(tipo: TipoPin) {
    this.editandoId = tipo.id;
    this.nuevoTipo = { ...tipo };
  }

  // Eliminar pin seleccionado
  eliminar(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de pin?')) {
      this.pinesService.eliminarTipo(id).subscribe();
    }
  }

  // Limpiar el estado del formulario
  resetForm() {
    this.nuevoTipo = { nombre: '', iconoUrl: '' };
    this.archivoSeleccionado = null;
    this.editandoId = null;
  }
}