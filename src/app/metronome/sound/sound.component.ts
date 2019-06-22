import {Component, DoCheck, OnInit} from '@angular/core';
import {MetronomeCommon} from '../../common/metronome.common';
import {Sound, SoundService} from '../../service/sound.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit, DoCheck {
  sounds: Sound[];
  selectedSound: Sound;

  constructor(private common: MetronomeCommon,
              private service: SoundService) {
  }

  ngOnInit() {
    this.sounds                = this.service.getValues();
    this.selectedSound         = this.sounds[0];
    this.service.selectedValue = this.selectedSound;
    this.service.createAudioInstance(this.selectedSound['file']);
  }

  ngDoCheck(): void {
    this.service.selectedValue = this.selectedSound;
  }

  private onClick(type: string) {
    switch (type) {
      case 'prev':
        this.selectedSound = this.common.prev(this.sounds, this.selectedSound);
        break;
      case 'next':
        this.selectedSound = this.common.next(this.sounds, this.selectedSound);
        break;
    }

    this.service.selectedValue = this.selectedSound;
  }
}
