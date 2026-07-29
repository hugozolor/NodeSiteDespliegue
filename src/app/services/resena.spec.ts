import { TestBed } from '@angular/core/testing';
import { ResenaService } from './resena'; // Cambia el import

describe('ResenaService', () => {
  let service: ResenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResenaService); // Inyecta la clase correcta
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});