import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme'; 

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Inyectamos la clase con el nombre correcto
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});