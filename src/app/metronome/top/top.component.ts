import { Component, OnInit } from '@angular/core';
import {TempoService} from '../../service/tempo.service';
import {SpeechService} from '../../service/speech.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
      private tempoService: TempoService,
      private speechService: SpeechService
  ) {}

  ngOnInit() {

    this.speechService.getResult().subscribe(res => {
      console.log(res);
    });
  }

  getTempo(): number {
    return this.tempoService.tempo;
  }

  getAnimation(): string {
    return this.tempoService.animation;
  }

  mouseup(): void {
    console.log('mouseup');
    this.speechService.startListening();
  }

  mousedown(): void {
    console.log('mousedown');
    this.speechService.stopListening();
  }
}
