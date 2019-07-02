import { Component, OnInit } from '@angular/core';
import {Beat, BeatService} from '../../service/beat.service';
import {MetronomeCommon} from '../../common/metronome.common';

@Component({
  selector: 'app-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.scss']
})
export class BeatComponent implements OnInit {
  beats: Beat[];
  selectedBeat: Beat;

  constructor(private common: MetronomeCommon,
              private service: BeatService) {

    this.service.getSelectedBeat().subscribe((value: Beat) => {
      this.selectedBeat = value;
    });
  }

  ngOnInit() {
    this.beats                 = this.service.getValues();
    // this.selectedBeat          = this.beats[3];
    // this.service.selectedValue = this.selectedBeat;

    this.service.setSelectedBeat(4);
  }

  private onClick(type: string) {
    switch (type) {
      case 'prev':
          this.service.prev();
        // this.selectedBeat = this.common.prev(this.beats, this.selectedBeat);
          break;
      case 'next':
        this.service.next();
        // this.selectedBeat = this.common.next(this.beats, this.selectedBeat);
        break;
    }

    // this.service.selectedValue = this.selectedBeat;
  }
}
