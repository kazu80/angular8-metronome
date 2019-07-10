import {Component, ElementRef, OnInit} from '@angular/core';

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

  constructor(el: ElementRef) {
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


    this.text01 = new PIXI.Text('BEAT', style01);
    this.text01.alpha = 1;
    // this.text01.filters = [filterBlur];
    this.app.stage.addChild(this.text01);

    this.text01.x = this.app.renderer.width / 2;
    this.text01.y = this.app.renderer.height / 2 + 100;
    this.text01.anchor.x = 0.5;
    this.text01.anchor.y = 0.5;

    // Text01
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
  }

}
