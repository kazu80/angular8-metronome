import {Component, ElementRef, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

declare var PIXI: any;

@Component({
    selector: 'app-top8',
    templateUrl: './top8.component.html',
    styleUrls: ['./top8.component.scss']
})
export class Top8Component implements OnInit {
    private dom: HTMLElement;

    private displayHeight: number;
    private displayWidth: number;
    private displayColor: string;
    private logoImagePath: string;

    private scene: Subject<number>;
    private app: any;
    private logo: any;
    private ticker: any;
    private handleTicker: object;

    constructor(el: ElementRef) {
        this.scene = new Subject();

        this.dom = el.nativeElement;

        this.displayHeight = window.innerHeight - 67;
        this.displayWidth = window.innerWidth;
        this.displayColor = '0xf2f2f2';

        this.logoImagePath = '/assets/images/angular8/logo.png';
    }

    ngOnInit() {
        this.scene.asObservable().subscribe((scene) => {
            switch (scene) {
                case 1:
                    this.scene1();
                    break;
                case 2:
                    this.scene2();
                    break;
                case 3:
                    this.scene3();
                    break;
            }
        });

        this.initializeAnime();
    }

    initializeAnime() {
        this.app = new PIXI.Application({
            width: this.displayWidth,
            height: this.displayHeight,
            backgroundColor: this.displayColor
        });

        this.dom.querySelector('#display').appendChild(this.app.view);

        this.app.loader.add('logo', this.logoImagePath).load(
            (loader, resorces) => {
                this.logo = new PIXI.Sprite(resorces.logo.texture);

                const filterBlur = new PIXI.filters.BlurFilter();
                this.logo.filters = [filterBlur];

                this.app.stage.addChild(this.logo);

                this.scene.next(1);
            }
        );
    }

    scene1() {
        const filter = this.logo.filters[0];
        filter.blur = 10;

        this.logo.x = this.app.renderer.width / 2;
        this.logo.y = this.app.renderer.height / 2;

        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;

        this.logo.scale.x = 1;
        this.logo.scale.y = 1;

        this.logo.alpha = 0;

        this.scene.next(2);
    }


    scene2() {
        this.ticker = this.app.ticker;
        const filter = this.logo.filters[0];

        this.handleTicker = (delta) => {
            if (this.logo.scale.x > 0.5) {
                this.logo.scale.x -= 0.05;
                this.logo.scale.y -= 0.05;
            }

            if (this.logo.alpha < 1) {
                this.logo.alpha += 0.2;
            }

            if (filter.blur > 0) {
                filter.blur -= 0.4;
            }

            if (this.logo.alpha >= 1 && filter.blur <= 0) {
                this.ticker.remove(this.handleTicker);
                setTimeout(() => {
                    this.scene.next(3);
                }, 1000);
            }
        };

        this.ticker.add(this.handleTicker);
    }

    scene3() {
        const filter = this.logo.filters[0];

        this.handleTicker = (delta) => {
            if (this.logo.scale.x < 1) {
                this.logo.scale.x += 0.05;
                this.logo.scale.y += 0.05;
            }

            if (this.logo.alpha > 0) {
                this.logo.alpha -= 0.1;
            }

            if (filter.blur < 10) {
                filter.blur += 2;
            }

            if (this.logo.alpha <= 0) {
                this.ticker.remove(this.handleTicker);

                setTimeout(() => {
                    this.scene.next(1);
                }, 1000);
            }
        };

        this.ticker.add(this.handleTicker);
    }
}
