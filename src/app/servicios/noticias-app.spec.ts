import { TestBed } from '@angular/core/testing';

import { NoticiasApp } from './noticias-app';

describe('NoticiasApp', () => {
  let service: NoticiasApp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiasApp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
