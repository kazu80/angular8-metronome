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
      width: window.innerWidth,
      height: window.innerHeight - 67,
      backgroundColor: 0xf2f2f2
    });

    this.dom.querySelector('#display').appendChild(app.view);

    app.loader.add('logo', '/assets/images/angular8/logo.png').load(
        (loader, resorces) => {
          const logo = new PIXI.Sprite(resorces.logo.texture);

          logo.x = app.renderer.width / 2;
          logo.y = app.renderer.height / 2;

          // Rotate around the center
          logo.anchor.x = 0.5;
          logo.anchor.y = 0.5;

          // Add the bunny to the scene we are building
          app.stage.addChild(logo);
        }
    );
  }
}
