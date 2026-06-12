import { TestBed } from '@angular/core/testing';

import { UnauthserService } from './unauthser.service';

describe('UnauthserService', () => {
  let service: UnauthserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnauthserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
