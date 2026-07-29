import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Inicializa en false para que no bloquee por defecto si no se le llama
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Exponemos el observable que el HTML del componente va a escuchar
  public isLoading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}