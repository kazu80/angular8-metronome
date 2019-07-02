import { Component, OnInit } from '@angular/core';
import {TempoService} from '../../service/tempo.service';
import {SpeechResult, SpeechService} from '../../service/speech.service';
import {VoiceService} from '../../service/voice.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
      private tempoService: TempoService,
      private speechService: SpeechService,
      private voiceService: VoiceService
  ) {}

  ngOnInit() {
    this.speechService.getResult().subscribe((res: SpeechResult) => {
      console.log(res);
        switch (res.speechResult) {
            case 'こんにちは':

                this.voiceService.speak('こんにちわ');
                break;
        }

    });
  }

  getTempo(): number {
    return this.tempoService.tempo;
  }

  getAnimation(): string {
    return this.tempoService.animation;
  }

  mouseup(): void {
    this.speechService.stopListening();
  }

  mousedown(): void {
    this.speechService.startListening();
  }
}
