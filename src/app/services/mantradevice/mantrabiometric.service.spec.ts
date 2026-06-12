import { TestBed } from '@angular/core/testing';

import { MantrabiometricService } from './mantrabiometric.service';

describe('MantrabiometricService', () => {
  let service: MantrabiometricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantrabiometricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
