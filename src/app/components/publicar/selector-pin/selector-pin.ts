import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../../services/reporte';
import { MapaGlobalService, TipoPin } from '../../../services/mapa-global';

@Component({
  selector: 'app-selector-pin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-pin.html',
  styleUrl: './selector-pin.css'
})
export class SelectorPinComponent implements OnInit {
  @Output() onSeleccionar = new EventEmitter<any>();
  
  private mapaGlobal = inject(MapaGlobalService);
  
  listaPines: TipoPin[] = [];
  seleccionadoId: string | null = null;

  ngOnInit() {
    // Cargamos del servicio global (ordenados ya por el servicio)
    this.mapaGlobal.obtenerTiposPines().subscribe(data => {
      this.listaPines = data;
    });
  }

  seleccionar(pin: TipoPin) {
    this.seleccionadoId = pin.id;
    this.onSeleccionar.emit(pin);
  }
}