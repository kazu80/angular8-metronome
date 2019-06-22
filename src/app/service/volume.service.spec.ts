import { TestBed } from '@angular/core/testing';

import { VolumeService } from './volume.service';

describe('VolumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumeService = TestBed.get(VolumeService);
    expect(service).toBeTruthy();
  });
});
