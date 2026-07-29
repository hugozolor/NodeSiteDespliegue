import { TestBed } from '@angular/core/testing';

import { DatosCompartidos } from './datos-compartidos';

describe('DatosCompartidos', () => {
  let service: DatosCompartidos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCompartidos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
