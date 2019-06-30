import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private _recordingValue: string;
  private _recording: Subject<string>;
  private _recordingURL: string;

  constructor() {
    this._recordingValue = 'stop';
    this._recording = new Subject();
  }

  public switchRecording(): void {
    this._recordingValue = this._recordingValue === 'stop' ? 'rec' : 'stop';
    this.recordingSet(this._recordingValue);
  }

  get recording() {
    return this._recording.asObservable();
  }

  public recordingSet(value: string) {
    this._recording.next(value);
  }

  get recordingURL() {
    return this._recordingURL;
  }

  set recordingURL(value: string) {
    this._recordingURL = value;
  }
}
