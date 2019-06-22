import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
  private _count: number;

  constructor() {
    this._count = 0;
  }

  get count(): number {
    return this._count;
  }

  public inclementCount() {
    this._count = this._count + 1;
  }

  public resetCount() {
    this._count = 0;
  }
}
