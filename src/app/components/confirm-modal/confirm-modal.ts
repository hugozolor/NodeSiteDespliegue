import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css'
})
export class ConfirmModalComponent {
  // Inputs que recibe del padre (PublishReview)
  @Input() title: string = 'Confirmar acción';
  @Input() pregunta: string = '¿Estás seguro de continuar?';
  @Input() barrio: string = '';

  // Eventos que notifican al padre
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirmar() {
    // Al hacer click en "Aceptar", avisamos al padre para que ejecute la lógica de guardado
    this.onConfirm.emit();
  }

  cancelar() {
    // Al hacer click en "Cancelar", avisamos al padre para que cierre el modal
    this.onCancel.emit();
  }
}