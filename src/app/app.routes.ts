import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard'; 
import { MapaComponent } from './pages/mapa/mapa';
import { ResenaComponent } from './pages/resena/resena';
import { PublishReviewComponent } from './pages/publish-review/publish-review';
import { PublicarComponent } from './pages/publicar/publicar';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones';
import { ChatbotComponent } from './pages/chatbot/chatbot';
import { LimitReachedComponent } from './components/limit-reached/limit-reached';
import { LoginComponent } from './pages/login/login';
import { adminGuardia } from './admin/guardias/admin';
import { AccesoAdminComponent } from './admin/paginas/acceso-admin/acceso-admin';
import { TableroControlComponent } from './admin/paginas/tablero-control/tablero-control';
import { GestionMapaComponent } from './admin/paginas/gestion-mapa/gestion-mapa';
import { PinesAdminComponent } from './admin/paginas/pines-admin/pines-admin';
import { PinesUsuariosComponent } from './admin/paginas/pines-usuarios/pines-usuarios';
import { NotificacionesAppComponent } from './admin/paginas/notificaciones-app/notificaciones-app';
import { AdvertenciaComponent } from './admin/paginas/advertencia/advertencia';
import { GestionResenasComponent } from './admin/paginas/gestion-resenas/gestion-resenas';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta';
import { HistorialComponent } from './pages/historial/historial';

import { BlogComponent } from './pages/blog/blog';
import { CentroAprendizajeComponent } from './pages/centro-aprendizaje/centro-aprendizaje';
import { Cv } from './pages/cv/cv';
import { GuiaComponent } from './pages/nosotros/nosotros';
import { NosotrosComponent } from './pages/quienes-somos/quienes-somos';
import { FaqComponent } from './pages/faq/faq';

export const routes: Routes = [
    // 1. Ruta principal (vacía) -> Carga el Home
    { path: '', component: Home },
    
    // 2. Ruta de registro -> Carga el Register
    { path: 'register', component: Register },

    { path: 'login', component: LoginComponent },

    // Ruta del Menú Principal (Donde iremos después de "loguearnos")
    { path: 'dashboard', component: Dashboard },

    { path: 'mapa', component: MapaComponent }, // Nueva ruta para el mapa

    { path: 'resenas', component: ResenaComponent},

    { path: 'publicar', component: PublicarComponent },

    { path: 'publish-review', component: PublishReviewComponent },

    { path: 'chatbot', component: ChatbotComponent },

    { path: 'notificaciones', component: NotificacionesComponent },

    { path: 'mi-cuenta', component: MiCuentaComponent },

    { path: 'historial', component: HistorialComponent },

    { path: 'limit-reached', component: LimitReachedComponent },

// 2. Agrega las nuevas rutas para los vecinos
  { 
    path: 'centro-aprendizaje', 
    component: CentroAprendizajeComponent,
    title: 'Centro de Aprendizaje - Plataforma Ciudadana' // Buen truco de Senior para cambiar el título de la pestaña
  },
  { 
    path: 'blog', 
    component: BlogComponent,
    title: 'Novedades y Actualizaciones'
  },

    { 
    path: 'cv', 
    component: Cv,
    title: 'CV'
  },

      { 
    path: 'nosotros', 
    component: GuiaComponent,
    title: 'nosotros'
  },

        { 
    path: 'quienes-somos', 
    component: NosotrosComponent,
    title: 'quienes-somos'
  },

          { 
    path: 'faq', 
    component: FaqComponent,
    title: 'faq'
  },


    // RUTAS DE ADMINISTRACIÓN
  { path: 'admin/login', component: AccesoAdminComponent },
  
  { 
    path: 'admin', 
    canActivate: [adminGuardia], // Protegemos todas estas rutas
    children: [
      { path: 'tablero-control', component: TableroControlComponent },
      { path: 'gestion-mapa', component: GestionMapaComponent },
      { path: 'pines-admin', component: PinesAdminComponent },
      { path: 'pines-usuarios', component: PinesUsuariosComponent },
      { path: 'notificaciones', component: NotificacionesAppComponent },
      { path: 'advertencias', component: AdvertenciaComponent },
      { path: 'gestion-resenas', component: GestionResenasComponent },
      { path: '', redirectTo: 'tablero-control', pathMatch: 'full' }
    ]
  },

    // (Opcional) Si escriben cualquier cosa rara, mandar al home
    { path: '**', redirectTo: '' }
];
