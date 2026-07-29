import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { NavBottomComponent } from '../../components/nav-bottom/nav-bottom';
// --- NUEVAS IMPORTACIONES (Servicio y Modelo) ---
import { NoticiasAppService } from '../../servicios/noticias-app';
import { Noticia } from '../../admin/modelos/noticia';

// --- NUEVA IMPORTACIÓN PARA LOS ICONOS ---
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // AGREGAMOS MatIconModule A LA LISTA DE IMPORTS
  imports: [CommonModule, HeaderComponent,NavBottomComponent , MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  currentSlide = 0;
  slideTimer: any;

  // Mantenemos tus slides originales por si el servicio tarda en cargar o para pruebas
  slides = [
    { title: 'Nueva Luminaria LED', desc: 'Mejoramos la iluminación en Barrio Norte.', type: 'Noticia' },
    { title: 'Tip de Seguridad', desc: 'Reporta baches en menos de 30 segundos.', type: 'Tip' }
  ];

  // --- NUEVA VARIABLE PARA ALMACENAR LAS NOTICIAS REALES ---
  listaNoticias: Noticia[] = [];

  menuOptions = [
  { 
      label: 'Mapa Interactivo', 
      desc: 'Visualiza reportes en tiempo real.', 
      iconName: 'travel_explore' // Icono de mapa con lupa (muy profesional)
    },
    { 
      label: 'Reseñas', 
      desc: 'Consulta la opinión de otros ciudadanos.', 
      iconName: 'rate_review' 
    },
    { 
      label: 'Publicar Reporte', 
      desc: 'Sube una foto y descripción de tu barrio.', 
      iconName: 'campaign' 
    },
    { 
      label: 'Chat Nodesite', 
      desc: 'Preguntale a nuestro guía digital lo que necesites.', 
      iconName: 'smart_toy' 
    },
    { 
      label: 'Notificación', 
      desc: 'Recibí actualizaciones oficiales sobre tus reportes.', 
      iconName: 'notifications_active' 
    },
    { 
      label: 'Nosotros', 
      desc: 'Conocé la ingeniería humana detrás de cada pin.', 
      iconName: 'account_tree' 
    }
];

  // Agregamos el servicio al constructor
  constructor(
    private router: Router,
    private noticiasService: NoticiasAppService
  ) {}

  ngOnInit() { 
    this.cargarNoticias(); // Cargamos las noticias del servicio
    this.startCarousel(); 
  }
  
  ngOnDestroy() { this.stopCarousel(); }

  // --- NUEVO MÉTODO: Obtiene los datos del servicio ---
  cargarNoticias() {
    this.noticiasService.obtenerNoticias().subscribe(data => {
      this.listaNoticias = data;
    });
  }

  navegar(label: string) {
    if (label === 'Mapa Interactivo') {
      this.router.navigate(['/mapa']);
    }
    if (label === 'Reseñas') {
    this.router.navigate(['/resenas']);
  }
  if (label === 'publicar Reseña') {
    this.router.navigate(['/publish-review']);
  }
  if (label === 'Publicar Reporte') {
    this.router.navigate(['/publicar']);
  }
  if (label === 'Chat Nodesite') {
    this.router.navigate(['/chatbot']);
  }
  if (label === 'Notificación') {
    this.router.navigate(['/notificaciones']);
  }
}

  // --- FUNCIONES QUE FALTABAN PARA SOLUCIONAR EL ERROR ---

  stopCarousel() {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  prevSlide() {
    this.stopCarousel(); // Pausa al interactuar
    const total = this.listaNoticias.length > 0 ? this.listaNoticias.length : this.slides.length;
    this.currentSlide = (this.currentSlide - 1 + total) % total;
    this.startCarousel(); // Reinicia
  }

  nextSlide() {
    this.stopCarousel(); // Pausa al interactuar
    const total = this.listaNoticias.length > 0 ? this.listaNoticias.length : this.slides.length;
    this.currentSlide = (this.currentSlide + 1) % total;
    this.startCarousel(); // Reinicia
  }

  startCarousel() {
    this.stopCarousel(); // Asegura no tener múltiples intervalos
    this.slideTimer = setInterval(() => {
      // Ajustamos para que use la longitud de la lista real si hay noticias
      const totalSlides = this.listaNoticias.length > 0 ? this.listaNoticias.length : this.slides.length;
      this.currentSlide = (this.currentSlide + 1) % totalSlides;
    }, 5000);
  }
}