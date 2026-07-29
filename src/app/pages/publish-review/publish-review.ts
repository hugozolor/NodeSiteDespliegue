import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Componentes
import { GuestBlockComponent } from '../../shared/components/guest-block/guest-block';
import { HeaderComponent } from '../../components/header/header';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';

// Servicios
import { DatosCompartidosService } from '../../services/datos-compartidos'; 
import { SessionService } from '../../core/services/session';
import { PublicationLimitService } from '../../services/publication-limit';

// Modelos
import { Barrio } from '../../models/barrio';
import { Review } from '../../models/review';

@Component({
  selector: 'app-publish-review',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ConfirmModalComponent, GuestBlockComponent],
  templateUrl: './publish-review.html',
  styleUrl: './publish-review.css'
})
export class PublishReviewComponent implements OnInit {
  private router = inject(Router);
  public session = inject(SessionService);
  public limitService = inject(PublicationLimitService);
  
  // Inyectamos el servicio compartido
  private datosService = inject(DatosCompartidosService);

  // Signals
  barrios = signal<Barrio[]>([]);
  busqueda = signal('');
  letraSeleccionada = signal<string | null>(null);
  
  barrioSeleccionado = signal<Barrio | null>(null);
  estrellas = signal(0);
  comentario = signal('');
  mostrarModal = signal(false);

  // Estado Ranking
  barrioExpandidoId = signal<string | null>(null);

  // Filtrado de Barrios
  barriosFiltrados = computed(() => {
    let resultado = this.barrios();
    const query = this.busqueda().toLowerCase();
    const letra = this.letraSeleccionada();

    if (query) {
      resultado = resultado.filter(b => b.nombre.toLowerCase().includes(query));
    } else if (letra) {
      resultado = resultado.filter(b => b.nombre.startsWith(letra));
    }
    return resultado;
  });

  // Signal con los 50 barrios de prueba autogenerados para verificar volumen y scroll
  top50Ranking = signal(this.generar50BarriosDePrueba());

  readonly filtrosAbecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

  ngOnInit(): void {
    if (!this.limitService.puedePublicar()) {
      this.router.navigate(['/limit-reached']);
      return;
    }

    // CARGA DE BARRIOS DESDE EL ADMIN (Cerebro Central)
    this.datosService.barrios$.subscribe(data => {
      this.barrios.set(data);
    });
  }

  /**
   * Genera una lista de 50 registros simulados utilizando barrios locales 
   * y fallbacks correlativos para forzar el comportamiento del scroll de la UI.
   */
  private generar50BarriosDePrueba() {
    const nombresBase = [
      'Tres Cerritos', 'Grand Bourg', 'Almudena', 'Santa Ana', 'Intersindical',
      'Ciudad del Milagro', 'El Huaico', 'San Carlos', 'Limache', 'Solidaridad',
      'San Remo', 'El Tribuno', 'Bancario', 'San José', 'Autódromo',
      'Constitución', 'Mirador', 'Vaqueros', 'Chachapoyas', 'Castañares',
      'General Mosconi', 'Hernando de Lerma', 'Ceferino', 'San Antonio', 'Luján',
      'Palermo', 'San Luis', 'La Loma', 'Don Emilio', 'Valle Hermoso'
    ];

    const lista = [];
    for (let i = 1; i <= 50; i++) {
      // Toma el nombre de la lista base o genera uno estructurado hasta llegar a 50
      const nombreBarrio = nombresBase[i - 1] || `Zona Residencial Demo ${i}`;
      
      // Genera puntajes decrecientes realistas combinados con una pequeña aleatoriedad
      const scoreCalculado = parseFloat((4.9 - (i * 0.04) + Math.random() * 0.15).toFixed(1));
      const scoreFinal = Math.min(Math.max(scoreCalculado, 1.0), 5.0);
      
      // Cantidad simulada de opiniones enviadas por vecinos
      const reseñasSimuladas = Math.floor(Math.random() * 95) + 4;

      lista.push({
        id: `mock-id-${i}`,
        position: i, // Se recalcula de forma estricta después de ordenar
        nombre: nombreBarrio,
        score: scoreFinal,
        reviewsCount: reseñasSimuladas
      });
    }

    // Ordenar de mayor a menor según su score y mapear la posición final (1 al 50)
    return lista
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({
        ...item,
        position: index + 1
      }));
  }

  // --- MÉTODOS UI ---
  filtrarPorLetra(letra: string) {
    this.letraSeleccionada.set(this.letraSeleccionada() === letra ? null : letra);
    this.busqueda.set(''); 
  }

  seleccionarBarrio(barrio: Barrio) {
    this.barrioSeleccionado.set(barrio);
    this.estrellas.set(0);
    this.comentario.set('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleRanking(id: string) {
    this.barrioExpandidoId.set(this.barrioExpandidoId() === id ? null : id);
  }

  // --- PUBLICACIÓN ---
  confirmarPublicacionFinal() {
    const barrio = this.barrioSeleccionado();
    if (!barrio) return;

    const nuevaResena: Review = {
      id: Date.now().toString(),
      barrioId: barrio.id,
      nombreBarrio: barrio.nombre,
      usuarioId: 'current-user', 
      usuarioNombre: 'Usuario App',
      calificacion: this.estrellas(),
      comentario: this.comentario(),
      fecha: new Date(),
      estado: 'publicada'
    };

    this.datosService.publicarReview(nuevaResena);
    this.limitService.consumirChance();
    this.mostrarModal.set(false);
    this.router.navigate(['/resenas']); 
  }
}