import { TestBed } from '@angular/core/testing';

import { MapaGlobal } from './mapa-global';

describe('MapaGlobal', () => {
  let service: MapaGlobal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaGlobal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
