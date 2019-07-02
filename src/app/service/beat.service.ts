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

  getValues(): Beat[] {
    return BEATS;
  }

  get selectedValue(): Beat {
    return this._selectedValue;
  }

  set selectedValue(value: Beat) {
    this._selectedValue = value;
  }

  setSelectedBeat(value: number) {
    if (BEATS[value - 1] !== undefined) {
      this._selectedValue = BEATS[value - 1];
      this.selectedBeat.next(BEATS[value - 1]);
    }
  }

  getSelectedBeat() {
    return this.selectedBeat.asObservable();
  }

  next() {
    console.log('next');
    const index = this.getIndexOfSelected();
    console.log(index);
    if (index) {
      this.setSelectedBeat(index + 2);
    }
  }

  prev() {
    const index = this.getIndexOfSelected();
    if (index) {
      this.setSelectedBeat(index - 1);
    }
  }

  private getIndexOfSelected() {
    return BEATS.findIndex((obj) => {
      return obj.id === this._selectedValue.id;
    });
  }
}
