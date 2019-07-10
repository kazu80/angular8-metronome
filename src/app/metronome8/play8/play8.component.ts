import {Component, ElementRef, OnInit} from '@angular/core';
import {BeatService} from "../../service/beat.service";
import {TempoService} from "../../service/tempo.service";
import {RunService} from "../../service/run.service";

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
      private runService: RunService
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

    // Text01
    const style01 = new PIXI.TextStyle({
      fontFamily: 'Noto Sans JP',
      fontSize: 60,
      fontWeight: '700',
      fill: 'white',
    });

    this.text01 = new PIXI.Text('TEMPO', style01);
    this.text01.alpha = 1;
    // this.text01.filters = [filterBlur];
    this.app.stage.addChild(this.text01);

    this.text01.x = this.app.renderer.width / 2;
    this.text01.y = this.app.renderer.height / 2 + 100;
    this.text01.anchor.x = 0.5;
    this.text01.anchor.y = 0.5;

    // Text02
    const style02 = new PIXI.TextStyle({
      fontFamily: 'Noto Sans JP',
      fontSize: 220,
      fontWeight: '700',
      fill: 'white',
    });


    this.text02 = new PIXI.Text('80', style02);
    this.text02.alpha = 1;
    // this.text01.filters = [filterBlur];
    this.app.stage.addChild(this.text02);

    this.text02.x = this.app.renderer.width / 2;
    this.text02.y = this.app.renderer.height / 2 - 30;
    this.text02.anchor.x = 0.5;
    this.text02.anchor.y = 0.5;

    //
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
}
