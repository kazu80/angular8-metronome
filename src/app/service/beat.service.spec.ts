import { TestBed } from '@angular/core/testing';

import { BeatService } from './beat.service';

describe('BeatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeatService = TestBed.get(BeatService);
    expect(service).toBeTruthy();
  });
});
