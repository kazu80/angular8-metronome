import { Injectable } from '@angular/core';
import {Volume, VolumeService} from './volume.service';
import {Beat, BeatService} from './beat.service';
import {Sound, SoundService} from './sound.service';
import {TempoService} from './tempo.service';
import {CounterService} from './counter.service';
import {VoiceService} from './voice.service';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(
      private volumeService: VolumeService,
      private beatService: BeatService,
      private soundService: SoundService,
      private tempoService: TempoService,
      private counterService: CounterService,
      private voiceService: VoiceService
  ) {
    this.beat = this.beatService.selectedValue;
    this.beatService.getSelectedBeat().subscribe((value: Beat) => {
      this.beat = value;
    });

    this.tempo = this.tempoService.tempo;
    this.tempoService.getTempo().subscribe(value => {
      this.tempo = value;
    });
  }
  tempo: number;
  beat: Beat;
  sound: Sound;
  interval: any;
  recordingSoundURL: string;
  audioTempo: HTMLAudioElement;
  audioBeat: HTMLAudioElement;
  contextTempo: AudioContext;
  contextBeat: AudioContext;

  static getAudio(path: string): HTMLAudioElement {
    const audio: HTMLAudioElement = new Audio(path);
    audio.controls = true;
    return audio;
  }

  start() {
    this.sound = this.soundService.selectedValue;

    // recoded sound
    this.recordingSoundURL = this.soundService.recording;

    //
    const beatSound: string = this.recordingSoundURL ? this.recordingSoundURL : '../../../../assets/sound/s_02.mp3';

    // Audio Context
    if (!this.contextTempo) {
      this.contextTempo = new AudioContext();
    }
    if (!this.contextBeat) {
      this.contextBeat = new AudioContext();
    }

    // Audio Element
    this.audioTempo = RunService.getAudio(this.sound.file);
    this.audioBeat  = RunService.getAudio(beatSound);

    // Read Media Source
    const sourceTempo: MediaElementAudioSourceNode = this.contextTempo.createMediaElementSource(this.audioTempo);
    const sourceBeat: MediaElementAudioSourceNode = this.contextBeat.createMediaElementSource(this.audioBeat);

    // 音量設定（Gain）
    this.setUpGain(this.contextTempo, sourceTempo);
    this.setUpGain(this.contextBeat, sourceBeat);

    // Run
    let count: any = 1;
    this.interval = setInterval(() => {
      count % this.beat.beat === 0 ? this.audioBeat.play() : this.audioTempo.play();
      count++;

      // tempo counter
      this.counterService.inclementCount();

    }, 60 * 1000 / this.tempo);
  }

  private setUpGain(context: AudioContext, source: MediaElementAudioSourceNode) {
    const volumeSelected: Volume = this.volumeService.selectedValue;
    const volumeGain: GainNode = context.createGain();

    volumeGain.gain.value = volumeSelected.volume * 0.1;

    source.connect(volumeGain);
    volumeGain.connect(context.destination);
  }

  stop() {
    clearInterval(this.interval);
  }
}
