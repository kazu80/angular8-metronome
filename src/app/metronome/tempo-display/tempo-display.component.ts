import {Component, OnInit} from '@angular/core';
import {TempoService} from '../../service/tempo.service';

@Component({
  selector: 'app-tempo-display',
  templateUrl: './tempo-display.component.html',
  styleUrls: ['./tempo-display.component.scss']
})
export class TempoDisplayComponent implements OnInit {
  tempoValue: number;

  constructor(
      private tempoService: TempoService
  ) {
    this.tempoService.getTempo().subscribe(val => {
      this.tempoValue = val;
    });
  }

  ngOnInit() {
    this.tempoValue = this.tempoService.tempo;
  }
}
