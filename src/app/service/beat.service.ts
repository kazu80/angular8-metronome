import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export class Beat {
  id: number;
  beat: number;
}

const BEATS: Beat[] = [
  {id: 1, beat: 1},
  {id: 2, beat: 2},
  {id: 3, beat: 3},
  {id: 4, beat: 4},
  {id: 5, beat: 5},
  {id: 6, beat: 6},
  {id: 7, beat: 7},
  {id: 8, beat: 8}
];

@Injectable()
export class BeatService {
  private _selectedValue: Beat;
  private selectedBeat: Subject<Beat>;

  constructor() {
    this.selectedBeat = new Subject();
  }

  static getValues(): Beat[] {
    return BEATS;
  }

  setSelectedBeat(numberArray: number) {
    const index = numberArray - 1;
    const beat = BEATS[index];

    if (beat !== undefined) {
      this._selectedValue = beat;
      this.selectedBeat.next(beat);
    }
  }

  getSelectedBeat() {
    return this.selectedBeat.asObservable();
  }

  next() {
    const index = this.getIndexOfSelected();

    if (index !== undefined) {
      const numberArray = index + 1;
      this.setSelectedBeat(numberArray + 1);
    }
  }

  prev() {
    const index = this.getIndexOfSelected();

    if (index !== undefined) {
      const numberArray = index + 1;
      this.setSelectedBeat(numberArray - 1);
    }
  }

  private getIndexOfSelected() {
    return BEATS.findIndex((obj) => {
      return obj.id === this._selectedValue.id;
    });
  }
}
