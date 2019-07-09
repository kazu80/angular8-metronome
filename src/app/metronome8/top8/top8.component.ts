import {Component, ElementRef, OnInit} from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-top8',
  templateUrl: './top8.component.html',
  styleUrls: ['./top8.component.scss']
})
export class Top8Component implements OnInit {

  private dom: HTMLElement;

  constructor(el: ElementRef) {
    this.dom = el.nativeElement;
  }

  ngOnInit() {
    const app = new PIXI.Application({
      view: this.dom.querySelector('#display')
    });

    app.renderer.backgroundColor = 0x666666;

  }

}
