import { TestBed } from '@angular/core/testing';

import { Barrios } from './barrios';

describe('Barrios', () => {
  let service: Barrios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Barrios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
