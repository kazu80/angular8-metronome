import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

declare var PIXI: any;

@Component({
    selector: 'app-top8',
    templateUrl: './top8.component.html',
    styleUrls: ['./top8.component.scss']
})
export class Top8Component implements OnInit, OnDestroy {
    private dom: HTMLElement;

    private displayHeight: number;
    private displayWidth: number;
    private displayColor: string;
    private logoImagePath: string;
    private bgmPath: string;

    private scene: Subject<number>;
    private app: any;
    private logo: any;
    private text01: any;
    private text02: any;
    private text03: any;
    private ticker: any;
    private handleTicker: object;
    private sceneTime: number;
    private sound: any;

    constructor(
        el: ElementRef,
        private router: Router
    ) {
        this.scene = new Subject();

        this.dom = el.nativeElement;

        this.displayHeight = window.innerHeight - 67;
        this.displayWidth = window.innerWidth;
        this.displayColor = '0xf2f2f2';

        this.logoImagePath = '/assets/images/angular8/logo.png';
        this.bgmPath = '/assets/sound/bgm.mp3';

        this.sceneTime = 6500;
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
                case 4:
                    this.scene4();
                    break;
                case 5:
                    this.scene5();
                    break;
                case 6:
                    this.scene6();
                    break;
                case 7:
                    this.scene7();
                    break;
                case 8:
                    this.scene8();
                    break;
            }
        });

        this.initializeAnime();
    }

    ngOnDestroy(): void {
        if (this.sound && this.sound.isPlaying === true) {
            this.sound.stop();
            this.sound = undefined;
        }

        this.handleTicker = undefined;
    }

    initializeAnime() {
        const filterBlur = new PIXI.filters.BlurFilter();

        this.app = new PIXI.Application({
            width: this.displayWidth,
            height: this.displayHeight,
            backgroundColor: this.displayColor
        });

        this.dom.querySelector('#display').appendChild(this.app.view);

        this.sound = PIXI.sound.Sound.from({
            url: this.bgmPath,
            singleInstance: true,
            preload: true,
            speed: 1.3,
            complete: (sound) => {
                // complete callbackが呼ばれない
                this.scene.next(6);
            },
            loaded: (err, sound) => {
                this.app.loader.add('logo', this.logoImagePath).load(
                    (loader, resorces) => {
                        this.logo = new PIXI.Sprite(resorces.logo.texture);

                        this.logo.filters = [filterBlur];

                        this.app.stage.addChild(this.logo);

                        this.scene.next(1);
                    }
                );
            }
        });

        // Text01
        const style01 = new PIXI.TextStyle({
            fontFamily: 'Noto Sans JP',
            fontSize: 36,
            fontWeight: '700',
        });

        this.text01 = new PIXI.Text('PRODUCED BY', style01);
        this.text01.filters = [filterBlur];
        this.text01.alpha = 0;
        this.app.stage.addChild(this.text01);

        // Text02
        const style02 = new PIXI.TextStyle({
            fontFamily: 'Noto Sans JP',
            fontSize: 36,
            fontWeight: '400',
        });
        this.text02 = new PIXI.Text('KAZUYOSHI KAWAKAMI', style02);
        this.text02.filters = [filterBlur];
        this.text02.alpha = 0;
        this.app.stage.addChild(this.text02);

        // Text03
        const style03 = new PIXI.TextStyle({
            fontFamily: 'Noto Sans JP',
            fontSize: 70,
            fontWeight: '400',
        });
        this.text03 = new PIXI.Text('METRONOME', style03);
        this.text03.filters = [filterBlur];
        this.text03.alpha = 0;
        this.app.stage.addChild(this.text03);
    }

    scene1() {
        if (this.sound.isPlaying === false) {
            this.sound.play();
        }

        setTimeout(() => {
            this.scene.next(2);
        }, 5000);

        const filter = this.logo.filters[0];
        filter.blur = 10;

        this.logo.x = this.app.renderer.width / 2;
        this.logo.y = this.app.renderer.height / 2;

        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;

        this.logo.scale.x = 1;
        this.logo.scale.y = 1;

        this.logo.alpha = 0;

        // text01
        this.text01.x = this.app.renderer.width / 2;
        this.text01.y = this.app.renderer.height / 2 - 50;
        this.text01.anchor.x = 0.5;
        this.text01.anchor.y = 0.5;
        this.text01.alpha = 0;

        // text02
        this.text02.x = this.app.renderer.width / 2;
        this.text02.y = this.app.renderer.height / 2 - 50 + 55;
        this.text02.anchor.x = 0.5;
        this.text02.anchor.y = 0.5;
        this.text02.alpha = 0;

        // text03
        this.text03.x = this.app.renderer.width / 2;
        this.text03.y = this.app.renderer.height / 2 - 20;
        this.text03.anchor.x = 0.5;
        this.text03.anchor.y = 0.5;
        this.text03.alpha = 0;
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
                }, this.sceneTime);
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
                    this.scene.next(7);
                }, this.sceneTime);
            }
        };

        this.ticker.add(this.handleTicker);
    }

    // PRODUCED BY
    scene4() {
        this.ticker = this.app.ticker;
        const filter01 = this.text01.filters[0];
        const filter02 = this.text02.filters[0];

        this.handleTicker = (delta) => {
            if (this.text01.scale.x > 1) {
                this.text01.scale.x -= 0.05;
                this.text01.scale.y -= 0.05;
            }

            if (this.text02.scale.x > 1) {
                this.text02.scale.x -= 0.05;
                this.text02.scale.y -= 0.05;
            }

            if (this.text01.alpha < 1) {
                this.text01.alpha += 0.2;
            }

            if (this.text02.alpha < 1) {
                this.text02.alpha += 0.2;
            }

            if (filter01.blur > 0) {
                filter01.blur -= 0.4;
            }

            if (filter02.blur > 0) {
                filter02.blur -= 0.4;
            }

            if (this.text01.alpha >= 1 && filter01.blur <= 0) {
                this.ticker.remove(this.handleTicker);
                setTimeout(() => {
                    this.scene.next(5);
                }, this.sceneTime);
            }
        };

        this.ticker.add(this.handleTicker);
    }

    scene5() {
        const filter01 = this.text01.filters[0];
        const filter02 = this.text02.filters[0];

        this.handleTicker = (delta) => {
            if (this.text01.scale.x < 1) {
                this.text01.scale.x += 0.05;
                this.text01.scale.y += 0.05;
            }

            if (this.text02.scale.x < 1) {
                this.text02.scale.x += 0.05;
                this.text02.scale.y += 0.05;
            }

            if (this.text01.alpha > 0) {
                this.text01.alpha -= 0.1;
            }

            if (this.text02.alpha > 0) {
                this.text02.alpha -= 0.1;
            }

            if (filter01.blur < 10) {
                filter01.blur += 2;
            }

            if (filter02.blur < 10) {
                filter02.blur += 2;
            }

            if (this.text01.alpha <= 0) {
                this.ticker.remove(this.handleTicker);

                setTimeout(() => {
                    this.scene.next(6);
                }, 4000);
            }
        };

        this.ticker.add(this.handleTicker);
    }

    scene6() {
        this.router.navigate(['/version8/play']);
    }

    scene7() {
        this.ticker = this.app.ticker;
        const filter = this.text03.filters[0];

        this.handleTicker = (delta) => {
            if (this.text03.scale.x > 1) {
                this.text03.scale.x -= 0.05;
                this.text03.scale.y -= 0.05;
            }

            if (this.text03.alpha < 1) {
                this.text03.alpha += 0.2;
            }

            if (filter.blur > 0) {
                filter.blur -= 0.4;
            }

            if (this.text03.alpha >= 1 && filter.blur <= 0) {
                this.ticker.remove(this.handleTicker);
                setTimeout(() => {
                    this.scene.next(8);
                }, this.sceneTime);
            }
        };

        this.ticker.add(this.handleTicker);
    }

    scene8() {
        const filter = this.text03.filters[0];

        this.handleTicker = (delta) => {
            if (this.text03.scale.x < 1) {
                this.text03.scale.x += 0.05;
                this.text03.scale.y += 0.05;
            }

            if (this.text03.alpha > 0) {
                this.text03.alpha -= 0.1;
            }

            if (filter.blur < 10) {
                filter.blur += 2;
            }

            if (this.text03.alpha <= 0) {
                this.ticker.remove(this.handleTicker);

                setTimeout(() => {
                    this.scene.next(4);
                }, 4000);
            }
        };

        this.ticker.add(this.handleTicker);
    }
}
