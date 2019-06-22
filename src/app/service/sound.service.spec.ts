import { TestBed } from '@angular/core/testing';

import { SoundService } from './sound.service';

describe('SoundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundService = TestBed.get(SoundService);
    expect(service).toBeTruthy();
  });
});
