import { Injectable } from '@angular/core';

export class Sound {
  id: number;
  file: string;
}

const SOUNDS: Sound[] = [
  {id: 1, file: '../../../../assets/sound/s_01.mp3'},
  {id: 2, file: '../../../../assets/sound/s_02.mp3'},
  {id: 3, file: '../../../../assets/sound/s_03.mp3'},
  {id: 4, file: '../../../../assets/sound/s_04.mp3'}
];

@Injectable()
export class SoundService {
  private _selectedValue: Sound;
  private _audio: HTMLAudioElement;
  private _recording: string;

  constructor() {
  }

  get selectedValue(): Sound {
    return this._selectedValue;
  }

  set selectedValue(value: Sound) {
    this._selectedValue = value;
  }

  get recording(): string {
    return this._recording;
  }

  set recording(value: string) {
    this._recording = value;
  }

  public getValues(): Sound[] {
    return SOUNDS;
  }

  public createAudioInstance(path: string): void {
    this._audio = new Audio(path);
  }
}
