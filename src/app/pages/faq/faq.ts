import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent {
  titulo = 'Preguntas Frecuentes';
      private router = inject(Router);
  
  listaFaq = [
    {
      pregunta: '¿Cómo publico un problema en mi barrio?',
      respuesta: 'Es muy fácil. Vas a la sección "Publicar" del menú, completas el formulario con la dirección, el tipo de incidente (bache, luminaria, basura) y una breve descripción.'
    },
    {
      pregunta: '¿Quiénes pueden ver mis reportes públicos?',
      respuesta: 'Todos los vecinos que ingresen a NodeSite pueden ver los pines en el mapa interactivo, al igual que los administradores del municipio.'
    },
    {
      pregunta: '¿Cuánto tiempo tarda la municipalidad en responder?',
      respuesta: 'Los reportes se procesan diariamente. El tiempo de reparación varía según la urgencia del caso y la disponibilidad de las cuadrillas técnicas.'
    },
    {
      pregunta: '¿El servicio tiene algún costo?',
      respuesta: 'No, NodeSite es una plataforma vecinal 100% gratuita destinada al beneficio de toda la comunidad.'
    }
  ];
}