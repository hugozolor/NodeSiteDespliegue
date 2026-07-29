import { TestBed } from '@angular/core/testing';

import { PublicationLimit } from './publication-limit';

describe('PublicationLimit', () => {
  let service: PublicationLimit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationLimit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
