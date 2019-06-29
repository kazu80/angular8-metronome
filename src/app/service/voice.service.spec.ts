import {TestBed} from '@angular/core/testing';

import {VoiceService} from './voice.service';

describe('VoiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: VoiceService = TestBed.get(VoiceService);
        expect(service).toBeTruthy();
    });
});
