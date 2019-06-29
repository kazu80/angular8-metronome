import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {TempoService} from '../../service/tempo.service';
import {Beat, BeatService} from '../../service/beat.service';
import {Sound, SoundService} from '../../service/sound.service';
import {Volume, VolumeService} from '../../service/volume.service';
import {CounterService} from '../../service/counter.service';
import {VoiceService} from "../../service/voice.service";

@Component({
  selector   : 'app-run',
  templateUrl: './run.component.html',
  styleUrls  : ['./run.component.scss'],
  animations : [
    trigger('metronomeRun', [
      state('inactive', style({
        'background-image': 'url("/assets/images/play.svg")',
        'background-color': '#ea5550',
      })),
      state('active', style({
        'background-image': 'url("/assets/images/stop.svg")',
        'background-color': '#ea5550',
        transform         : 'scale(1.1, 1.1)'
      })),
      transition('inactive => active', [
        animate(200, keyframes([
          style({transform: 'scale(.95, .95)', offset: .7}),
          style({transform: 'scale(1.2, 1.2)', offset: .8}),
          style({transform: 'scale(1.1, 1.1)', offset: 1})
        ]))
      ]),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ]
})
export class RunComponent implements OnInit {
  isDuringExecution: boolean;
  interval: any;
  beat: Beat;
  tempo: number;
  button: string;
  recordingSoundURL: string;
  contextTempo: AudioContext;
  contextBeat: AudioContext;
  sound: Sound;
  audioTempo: HTMLAudioElement;
  audioBeat: HTMLAudioElement;

    constructor(
        private volumeService: VolumeService,
        private beatService: BeatService,
        private soundService: SoundService,
        private tempoService: TempoService,
        private counterService: CounterService,
        private voiceService: VoiceService
    ) {
  }

  ngOnInit() {
    this.isDuringExecution = false;
    this.button            = 'inactive';

    // recoded sound
    this.recordingSoundURL = this.soundService.recording;
  }

  private getAudio(path: string): HTMLAudioElement {
    const audio: HTMLAudioElement = new Audio(path);
    audio.controls                = true;
    return audio;
  }

  private onClick() {
    this.sound = this.soundService.selectedValue;

    // Beat Sound
    const beatSound: string = this.recordingSoundURL ? this.recordingSoundURL : '../../../../assets/sound/s_02.mp3';

    // Audio Context
    if (!this.contextTempo) {
      this.contextTempo = new AudioContext();
    }
    if (!this.contextBeat) {
      this.contextBeat = new AudioContext();
    }

    // Audio Element
    this.audioTempo = this.getAudio(this.sound.file);
    this.audioBeat  = this.getAudio(beatSound);

    // Read Media Source
    const sourceTempo: MediaElementAudioSourceNode = this.contextTempo.createMediaElementSource(this.audioTempo);
    const sourceBeat: MediaElementAudioSourceNode  = this.contextBeat.createMediaElementSource(this.audioBeat);

    //
    this.isDuringExecution = !this.isDuringExecution;
    this.button            = this.button === 'active' ? 'inactive' : 'active';

    // 停止
    if (!this.isDuringExecution) {
      clearInterval(this.interval);

      // reset tempo counter
      this.counterService.resetCount();

      return;
    }

    // ビート
    this.beat               = this.beatService.selectedValue;
    const beatCount: number = this.beat.beat;

    // テンポ
    this.tempo = this.tempoService.tempo;

    // 音量設定（Gain）
    this.setUpGain(this.contextTempo, sourceTempo);
    this.setUpGain(this.contextBeat, sourceBeat);

    // Run
    let count: any = 1;
      let countBeat = 1;
      this.interval = setInterval(() => {
          count % beatCount === 0 ? this.audioBeat.play() : this.audioTempo.play();
          count++;

          let isThree = false;
          if (countBeat % 3 === 0) {
              isThree = true;
          }

          if (/3/.test(countBeat.toString())) {
              isThree = true;
          }


          if (count % beatCount === 0) {
              this.voiceService.speak(countBeat.toString(), isThree ? 2 : 0);
              countBeat++;
          }


      // tempo counter
      this.counterService.inclementCount();

    }, 60 * 1000 / this.tempo);
  }

  /**
   * set up Gain
   */
  private setUpGain(context: AudioContext, source: MediaElementAudioSourceNode) {
    const volumeSelected: Volume = this.volumeService.selectedValue;
    const volumeGain: GainNode   = context.createGain();

    volumeGain.gain.value = volumeSelected.volume * 0.1;

    source.connect(volumeGain);
    volumeGain.connect(context.destination);
  }
}
