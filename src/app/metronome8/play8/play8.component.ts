import {Component, ElementRef, OnInit} from '@angular/core';
import {BeatService} from "../../service/beat.service";
import {TempoService} from "../../service/tempo.service";
import {RunService} from "../../service/run.service";
import {SpeechResult, SpeechService} from "../../service/speech.service";
import {VoiceService} from "../../service/voice.service";

declare var PIXI: any;

@Component({
  selector: 'app-play8',
  templateUrl: './play8.component.html',
  styleUrls: ['./play8.component.scss']
})
export class Play8Component implements OnInit {
  private dom: HTMLElement;

  private displayHeight: number;
  private displayWidth: number;

  private text01: any;
  private text02: any;

  private app: any;

  private handleTicker: any;
  private ticker: any;

  constructor(
      el: ElementRef,
      private beatService: BeatService,
      private tempoService: TempoService,
      private runService: RunService,
      private speechService: SpeechService,
      private voiceService: VoiceService
  ) {
    this.dom = el.nativeElement;

    this.displayHeight = window.innerHeight - 67;
    this.displayWidth = window.innerWidth;
  }

  ngOnInit() {
    this.app = new PIXI.Application({
      width: this.displayWidth,
      height: this.displayHeight,
      transparent: true,
    });

    this.dom.querySelector('#display').appendChild(this.app.view);

    const filterBlur = new PIXI.filters.BlurFilter();
    filterBlur.blur = 10;

    // Text "TEMPO"
    this.text01 = this.displayText('TEMPO', {
      fontFamily: 'Noto Sans JP',
      fontSize: 60,
      fontWeight: '700',
      fill: 'white',
    });
    this.text01.y = this.app.renderer.height / 2  + 100;
    this.app.stage.addChild(this.text01);

    // Text "80"
    this.text02 = this.displayText('80', {
      fontFamily: 'Noto Sans JP',
      fontSize: 220,
      fontWeight: '700',
      fill: 'white',
    });
    this.text02.y = this.app.renderer.height / 2 - 30;
    this.app.stage.addChild(this.text02);

    // Text "80" change
    this.numberChange();

    // SPEECH
    this.speechInit();
  }

  numberChange() {
    this.ticker = this.app.ticker;

    this.tempoService.getTempo().subscribe(val => {

      this.handleTicker = (delta) => {
        const num: string = this.text02.text;

        let tempoValue = Number(num);

        if (tempoValue < val) {
          tempoValue++;
        } else {
          tempoValue--;
        }

        if (tempoValue === val) {
          this.ticker.remove(this.handleTicker);
        }

        this.text02.text = tempoValue.toString();
      };

      this.ticker.add(this.handleTicker);
    });
  }

  displayText(val: string, style: object) {
    const filterBlur = new PIXI.filters.BlurFilter();
    filterBlur.blur = 10;

    const text = new PIXI.Text(val, style);
    text.alpha = 0;
    text.filters = [filterBlur];

    text.x = this.app.renderer.width / 2;
    text.y = this.app.renderer.height / 2;
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;

    return text;
  }

  speechInit() {
    this.speechService.getResult().subscribe((res: SpeechResult) => {
      console.log(res);
      switch (res.speechResult) {
        case 'hello':

          this.voiceService.speak('こんにちわ');
          break;

        case 'temp':
          this.displayTempo();
          break;

        case 'disappear':
        case 'disappeared':
          this.disappearTempo();
          break;

        case 'play':
          this.play();
          break;

        case 'stop':
          this.stop();
          break;

        default:
          this.question(res.speechResult);
          break;
      }

    });
  }

  tempoUp() {
    // this.tempoService.inclementTempo();
    this.tempoService.tempo = 255;
  }

  play() {
    this.runService.start();
  }

  stop() {
    this.runService.stop();
  }

  displayTempo() {
    const filter01 = this.text01.filters[0];
    const filter02 = this.text02.filters[0];

    this.handleTicker = (delta) => {
      if (this.text01.alpha < 1) {
        this.text01.alpha += 0.02;
      }

      if (this.text02.alpha < 1) {
        this.text02.alpha += 0.02;
      }

      if (filter01.blur > 0) {
        filter01.blur -= 0.1;
      }

      if (filter02.blur > 0) {
        filter02.blur -= 0.1;
      }

      if (this.text01.alpha >= 1  && filter01.blur <= 0) {
        this.ticker.remove(this.handleTicker);
      }
    };

    this.ticker.add(this.handleTicker);
  }

  disappearTempo() {
    const filter01 = this.text01.filters[0];
    const filter02 = this.text02.filters[0];

    this.handleTicker = (delta) => {
      if (this.text01.alpha > 0) {
        this.text01.alpha -= 0.06;
      }

      if (this.text02.alpha > 0) {
        this.text02.alpha -= 0.06;
      }

      if (filter01.blur < 10) {
        filter01.blur += 0.3;
      }

      if (filter02.blur < 10) {
        filter02.blur += 0.3;
      }

      if (this.text01.alpha <= 0  && filter01.blur >= 10) {
        this.ticker.remove(this.handleTicker);
      }
    };

    this.ticker.add(this.handleTicker);
  }

  mouseup(): void {
    this.speechService.stopListening();
  }

  mousedown(): void {
    this.speechService.startListening();
  }

  question(val: string) {

  }
}
