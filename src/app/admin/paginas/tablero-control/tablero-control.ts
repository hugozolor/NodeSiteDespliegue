import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from '../../componentes/menu-lateral/menu-lateral';
import { CabeceraAdminComponent } from '../../componentes/cabecera-admin/cabecera-admin';
import { ModeracionAdminService } from '../../servicios/moderacion-admin'; // Importamos el servicio
import { MapaAdminService } from '../../servicios/mapa-admin';

@Component({
  selector: 'app-tablero-control',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuLateralComponent, CabeceraAdminComponent],
  templateUrl: './tablero-control.html',
  styleUrls: ['./tablero-control.css']
})
export class TableroControlComponent implements OnInit {
  cantidadAdvertencias: number = 0;
  cantidadObras: number = 0;

  constructor(
    private moderacionService: ModeracionAdminService,
    private mapaService: MapaAdminService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos al contador para que cambie en tiempo real
    this.moderacionService.contador$.subscribe(valor => {
      this.cantidadAdvertencias = valor;
    });
    // Suscripción a Obras Activas
    this.mapaService.obrasActivas$.subscribe(valor => {
      this.cantidadObras = valor;
    });
  }
}