import {Component, OnInit} from '@angular/core';
import {TempoService} from '../../service/tempo.service';

@Component({
  selector   : 'app-tempo-control-button',
  templateUrl: './tempo-control-button.component.html',
  styleUrls  : ['./tempo-control-button.component.scss']
})
export class TempoControlButtonComponent implements OnInit {

  constructor(private service: TempoService) {
  }

  ngOnInit() {
  }

  public onClick(type: string) {
    switch (type) {
      case 'prev':
        this.service.declementTempo();
        break;
      case 'next':
        this.service.inclementTempo();
        break;
    }
  }
}
