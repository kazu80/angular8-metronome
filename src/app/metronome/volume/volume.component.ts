import { Component, OnInit } from '@angular/core';
import {Volume, VolumeService} from '../../service/volume.service';
import {MetronomeCommon} from '../../common/metronome.common';

@Component({
  selector   : 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls  : ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  volumes: Volume[];
  selectedVolume: Volume;

  constructor(private common: MetronomeCommon,
              private service: VolumeService) {
  }

  ngOnInit() {
    this.volumes               = this.service.getValues();
    this.selectedVolume        = this.volumes[5];
    this.service.selectedValue = this.selectedVolume;
  }

  private onClick(type: string) {
    switch (type) {
      case 'prev':
        this.selectedVolume = this.common.prev(this.volumes, this.selectedVolume);
        break;
      case 'next':
        this.selectedVolume = this.common.next(this.volumes, this.selectedVolume);
        break;
    }

    this.service.selectedValue = this.selectedVolume;
  }
}
