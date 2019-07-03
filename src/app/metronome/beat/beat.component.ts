import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Beat, BeatService} from '../../service/beat.service';
import {MetronomeCommon} from '../../common/metronome.common';

@Component({
  selector: 'app-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.scss']
})
export class BeatComponent implements OnInit, AfterViewInit {
  beats: Beat[];
  selectedBeat: Beat;

  constructor(private common: MetronomeCommon,
              private beatService: BeatService) {

      this.beatService.getSelectedBeat().subscribe((value: Beat) => {
      this.selectedBeat = value;
    });
  }

  ngOnInit() {
      this.beats = BeatService.getValues();
  }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.beatService.setSelectedBeat(4);
        });
    }

  private onClick(type: string) {
    switch (type) {
      case 'prev':
          this.beatService.prev();
          break;
      case 'next':
          this.beatService.next();
        break;
    }
  }
}
