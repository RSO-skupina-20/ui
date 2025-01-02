import { TestBed } from '@angular/core/testing';

import { NajemProstorovService } from './najem-prostorov.service';

describe('NajemProstorovService', () => {
  let service: NajemProstorovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NajemProstorovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
