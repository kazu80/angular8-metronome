import { Injectable } from '@angular/core';

export class Volume {
  id: number;
  volume: number;
  label: string;
}

const VOLUMES: Volume[] = [
  {id: 0, volume: 0, label: '●'},
  {id: 1, volume: 1, label: '●'},
  {id: 2, volume: 2, label: '●'},
  {id: 3, volume: 3, label: '●'},
  {id: 4, volume: 4, label: '●'},
  {id: 5, volume: 5, label: '●'},
  {id: 6, volume: 6, label: '●'},
  {id: 7, volume: 7, label: '●'},
  {id: 8, volume: 8, label: '●'},
  {id: 9, volume: 9, label: '●'}
];

@Injectable()
export class VolumeService {
  private _selectedValue: any;

  constructor() {
    this._selectedValue = VOLUMES[4];
  }

  get selectedValue(): any {
    return this._selectedValue;
  }

  set selectedValue(value: any) {
    this._selectedValue = value;
  }

  public getValues(): Volume[] {
    return VOLUMES;
  }
}
