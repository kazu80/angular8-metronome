import {Component, ElementRef, OnInit} from '@angular/core';
import {BeatService} from '../../service/beat.service';
import {TempoService} from '../../service/tempo.service';
import {RunService} from '../../service/run.service';
import {SpeechResult, SpeechService} from '../../service/speech.service';
import {VoiceService} from '../../service/voice.service';

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
  private textPlay: any;
  private textStop: any;
  private textSpeech: any;

  private app: any;

  private handleTicker: any;
  private ticker: any;

  private isTempo: boolean;

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

    this.isTempo = false;

    PIXI.sound.add('speech', '/assets/sound/btnSpeech.mp3');
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
    this.text01 = this.createText('TEMPO', {
      fontFamily: 'Noto Sans JP',
      fontSize: 60,
      fontWeight: '700',
      fill: 'white',
    });
    this.text01.y = this.app.renderer.height / 2  + 100;
    this.app.stage.addChild(this.text01);

    // Text "80"
    this.text02 = this.createText('80', {
      fontFamily: 'Noto Sans JP',
      fontSize: 220,
      fontWeight: '700',
      fill: 'white',
    });
    this.text02.y = this.app.renderer.height / 2 - 30;
    this.app.stage.addChild(this.text02);

    // Text "80" change
    this.numberChange();

    // Text Play
    this.textPlay = this.createText('PLAY', {
      fontFamily: 'Noto Sans JP',
      fontSize: 80,
      fontWeight: '700',
      fill: '#ccffcc',
    });
    this.textPlay.y = this.app.renderer.height / 2;
    this.app.stage.addChild(this.textPlay);

    // Text Stop
    this.textStop = this.createText('STOP', {
      fontFamily: 'Noto Sans JP',
      fontSize: 80,
      fontWeight: '700',
      fill: '#ffcccc',
    });
    this.textStop.y = this.app.renderer.height / 2;
    this.app.stage.addChild(this.textStop);

    // Speech Text
    this.textSpeech = this.createText('foo', {
      fontFamily: 'Noto Sans JP',
      fontSize: 50,
      fontWeight: '700',
      fill: 'white',
    });
    this.textSpeech.x = 40;
    this.textSpeech.y = this.app.renderer.height - 100;
    this.textSpeech.anchor.x = 0;
    this.textSpeech.anchor.y = 0;

    this.app.stage.addChild(this.textSpeech);

    // SPEECH
    this.speechInit();

    // Display PLAY
    this.appearText(this.textPlay);
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

  createText(val: string, style: object) {
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
        case 'Temple':
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

        case 'up':
          if (this.isTempo === true && this.tempoService.tempo < 245) {
            this.tempoService.tempo += 10;
          }
          break;

        case 'down':
          if (this.isTempo === true && this.tempoService.tempo > 10) {
            this.tempoService.tempo -= 10;
          }
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
    this.disappearText(this.textPlay);
    this.appearText(this.textStop);
    this.runService.start();
  }

  stop() {
    this.disappearText(this.textStop);
    this.appearText(this.textPlay);
    this.runService.stop();
  }

  appearText(text: any): void {
    const filter = text.filters[0];

    const handleTicker = (delta) => {
      if (text.alpha < 1) {
        text.alpha += 0.02;
      }

      if (filter.blur > 0) {
        filter.blur -= 0.1;
      }

      if (text.alpha >= 1  && filter.blur <= 0) {
        this.ticker.remove(handleTicker);
      }
    };

    this.ticker.add(handleTicker);
  }

  appearTextLib01(text: any, displayText: string): void {
    const filter = text.filters[0];
    filter.blur = 0;
    text.alpha = 1;

    text.text = '"';
    let i = 0;
    const handleTicker = (delta) => {

      const displayChar = displayText.substr(i, 1);
      text.text += displayChar;

      if (text.text.length >= displayText.length) {
        text.text += '" 🤔';
        this.ticker.remove(handleTicker);
      }

      i++;
    };

    this.ticker.add(handleTicker);

    setTimeout(() => text.alpha = 0, 2000);
  }

  disappearText(text: any): void {
    const filter = text.filters[0];

    const handleTicker = (delta) => {
      if (text.alpha > 0) {
        text.alpha -= 0.06;
      }

      if (filter.blur < 10) {
        filter.blur += 0.3;
      }

      if (text.alpha <= 0  && filter.blur >= 10) {
        this.ticker.remove(handleTicker);
      }
    };

    this.ticker.add(handleTicker);
  }

  displayTempo() {
    if (this.isTempo === true) {
      return;
    }

    this.isTempo = true;

    // メトロノームを止める
    this.runService.stop();

    this.disappearText(this.textPlay);
    this.disappearText(this.textStop);

    this.appearText(this.text01);
    this.appearText(this.text02);
  }

  disappearTempo() {
    if (this.isTempo === false) {
      return;
    }

    this.isTempo = false;

    this.appearText(this.textPlay);
    this.disappearText(this.text01);
    this.disappearText(this.text02);
  }

  mouseup(): void {
    this.speechService.stopListening();
  }

  mousedown(): void {
    PIXI.sound.play('speech');
    this.speechService.startListening();
  }

  question(val: string) {
    this.appearTextLib01(this.textSpeech, val);
  }
}
