import { Injectable } from '@angular/core';

@Injectable()
export class TempoService {
  private _tempo: number;
  private _animation: string;

  constructor() {
    this._tempo     = 80;
    this._animation = 'stop';
  }

  get tempo(): number {
    return this._tempo;
  }

  set tempo(value: number) {
    this._tempo = value;
  }

  get animation(): string {
    return this._animation;
  }

  set animation(value: string) {
    this._animation = value;
  }

  public inclementTempo(): void {
    this._tempo = this._tempo + 1;
  }

  public declementTempo(): void {
    this._tempo = this._tempo - 1;
  }
}
