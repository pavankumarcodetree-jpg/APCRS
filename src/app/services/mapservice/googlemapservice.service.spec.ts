import { TestBed } from '@angular/core/testing';

import { GooglemapserviceService } from './googlemapservice.service';

describe('GooglemapserviceService', () => {
  let service: GooglemapserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglemapserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
