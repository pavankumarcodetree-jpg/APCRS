import { TestBed } from '@angular/core/testing';

import { GistTransliterationService } from './gist-transliteration.service';

describe('GistTransliterationService', () => {
  let service: GistTransliterationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GistTransliterationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
