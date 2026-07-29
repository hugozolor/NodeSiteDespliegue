import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { trigger, transition, style, animate } from '@angular/animations';
import { ReporteService } from '../../services/reporte';
import { SelectorPinComponent } from '../../components/publicar/selector-pin/selector-pin';
import { HeaderComponent } from '../../components/header/header';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';
import { SessionService } from '../../core/services/session'; // <--- AGREGADO
import { GuestBlockComponent } from '../../shared/components/guest-block/guest-block';

// [NUEVO] Servicio Global para conectar con el Mapa General
import { MapaGlobalService } from '../../services/mapa-global';

// [NUEVO] Servicio para limitar publicaciones (5 al mes)
import { PublicationLimitService } from '../../services/publication-limit';

@Component({
  selector: 'app-publicar',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectorPinComponent, HeaderComponent, ConfirmModalComponent, GuestBlockComponent],
  templateUrl: './publicar.html',
  styleUrl: './publicar.css',
  animations: [
    trigger('sheetAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class PublicarComponent implements OnInit {
  public reporteService = inject(ReporteService);
  private router = inject(Router); 
  public sessionService = inject(SessionService);
  
  // [NUEVO] Inyectamos el servicio puente
  private mapaGlobal = inject(MapaGlobalService);

  // [NUEVO] Inyectamos servicio de límites
  public limitService = inject(PublicationLimitService);
  
  pasoActual$ = this.reporteService.pasoActual$;
  pinSeleccionado: any = null;
  descripcion: string = '';
  fotos: any[] = [];
  mostrarAlerta: boolean = false;

  ngOnInit() {
    // [NUEVO] Verificar si tiene chances disponibles antes de empezar
    if (!this.limitService.puedePublicar()) {
      this.router.navigate(['/limit-reached']);
      return;
    }

    this.reporteService.setStep('SELECCION_PIN');
  }

  onPinSelected(pin: any) {
    this.pinSeleccionado = pin;
  }

  // --- RECUPERADO: Función para subir fotos que pide tu HTML ---
  subirFoto(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotos.push(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  intentarContinuar() {
    if (this.sessionService.isGuest()) return;
    this.mostrarAlerta = true;
  }

  onConfirmarAlerta() {
    this.mostrarAlerta = false;
    
    // 1. Guardado Local (Mantiene tu lógica actual)
    this.reporteService.actualizarReporte({
      descripcion: this.descripcion,
      fotos: this.fotos
    });

    // 2. [NUEVO] Guardado Global (Puente al Mapa)
    // Esto prepara el "Borrador" para que el mapa sepa qué icono mostrar al hacer click
    if (this.pinSeleccionado) {
      this.mapaGlobal.guardarBorrador({
        tipo: this.pinSeleccionado.nombre,   // Nombre del tipo (ej: Bache)
        iconoUrl: this.pinSeleccionado.iconoUrl || 'pin.webp', // Icono visual
        descripcion: this.descripcion,
        imagenes: this.fotos,
        usuario: 'Usuario', // TODO: Usar nombre real del sessionService
        esAdmin: false
      });
    }

    // [NUEVO] Consumir una chance (corazón) al confirmar la publicación
    this.limitService.consumirChance();

    this.reporteService.setStep('MAPA');
    this.router.navigate(['/mapa']);
  }

  // --- RECUPERADO: Función para cerrar el modal ---
  onCancelarAlerta() {
    this.mostrarAlerta = false;
  }
}