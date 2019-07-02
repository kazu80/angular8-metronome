import {Component, ElementRef, Input, OnInit} from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-tempo-display',
  templateUrl: './tempo-display.component.html',
  styleUrls: ['./tempo-display.component.scss']
})
export class TempoDisplayComponent implements OnInit {
  @Input() set tempo(value: number) {
    this.tempoValue = value;
    if (this.tempoPixiText !== undefined) {
      this.tempoPixiText.text = value;
    }
  }
  @Input() runStatus: string;

  tempoPixiText: any;
  tempoValue: number;
  private dom: HTMLElement;


  constructor(el: ElementRef) {
    this.dom = el.nativeElement;
  }

  ngOnInit() {
    const app = new PIXI.Application({
      view: this.dom.querySelector('#tempo-display')
    });

    app.renderer.backgroundColor = 0x666666;

    const style   = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 300,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 1840,
      align: 'right'
    });
    this.tempoPixiText = new PIXI.Text(this.tempoValue, style);

    this.tempoPixiText.x = 0;
    this.tempoPixiText.y = 0;

    app.stage.addChild(this.tempoPixiText);
  }

}
