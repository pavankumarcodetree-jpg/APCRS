import { TestBed } from '@angular/core/testing';

import { UploadspdfService } from './uploadspdf.service';

describe('UploadspdfService', () => {
  let service: UploadspdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadspdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
