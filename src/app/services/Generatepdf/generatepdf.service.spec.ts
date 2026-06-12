import { TestBed } from '@angular/core/testing';

import { GeneratepdfService } from './generatepdf.service';

describe('GeneratepdfService', () => {
  let service: GeneratepdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratepdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
