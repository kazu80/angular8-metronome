import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

declare var webkitSpeechRecognition: any;

const LISTENING_STATE = Object.freeze({
  IDLE: 'idle',
  LISTENING: 'listening',
  USER_INPUT: 'user-input',
  DISABLED: 'disabled'
});

export class SpeechResult {
  speechResult: string;
  confidence: number;
  isFinal: boolean;
  sourceEvent: SpeechRecognitionEvent;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speech: SpeechRecognition;
  private state: string;
  private result: Subject<object>;

  constructor() {
    this.state = LISTENING_STATE.IDLE;
    this.result = new Subject();

    const speechRecognition = webkitSpeechRecognition || SpeechRecognition;
    this.speech = new speechRecognition();
    this.speech.lang = 'en-US';
    // this.speech.lang = 'ja-JP';
    this.speech.onresult = this.onSpeechResult.bind(this);
    this.speech.onspeechend = this.onSpeechEnd;
    this.speech.onerror = this.onSpeechError;
    this.speech.continuous = false;
    this.speech.onend = this.onEnd.bind(this);
  }

  onSpeechResult(event: SpeechRecognitionEvent) {
    const result: SpeechResult = {
      speechResult : event.results[0][0].transcript,
      confidence : event.results[0][0].confidence,
      isFinal : event.results[0].isFinal,
      sourceEvent: event
    };

    this.setResult(result);

    if (result.isFinal) {
      this.state = LISTENING_STATE.IDLE;
    }
  }

  onSpeechEnd() {
    this.state = LISTENING_STATE.IDLE;
  }

  onSpeechError(event) {
    this.state = LISTENING_STATE.IDLE;
    console.error(event);
  }

  onEnd(e) {
    console.log('onend', e, this);
    this.speech.start();
    this.state = LISTENING_STATE.IDLE;
  }

  setResult(value) {
    this.result.next(value);
  }

  public getResult() {
    return this.result.asObservable();
  }

  public startListening() {
    console.log('start', this.state);
    if (this.state === LISTENING_STATE.LISTENING) { return; }

    console.log('foo');

    this.state = LISTENING_STATE.LISTENING;
    this.speech.start();

  }

  public stopListening() {
    console.log('stop', this.state);
    if (this.state !== LISTENING_STATE.LISTENING) { return; }

    console.log('bar');

    this.speech.stop();
  }
}
