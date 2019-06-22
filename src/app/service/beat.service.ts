import { Injectable } from '@angular/core';

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

  constructor() {
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
}
