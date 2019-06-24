import {Component, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {SoundService} from '../../service/sound.service';
import {AppDispatcher} from '../../walts/app.dispatcher';
import {AppActions} from '../../walts/app.actions';
import {AppStore} from '../../walts/app.store';

declare var MediaRecorder: any;

@Component({
  selector   : 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls  : ['./recording.component.scss'],
  animations : [
    trigger('recording_state', [
      state('three', style({
        'background-image': 'url("/assets/images/three.svg")',
        'background-color': '#888',
      })),
      state('two', style({
        'background-image': 'url("/assets/images/two.svg")',
        'background-color': '#888',
      })),
      state('one', style({
        'background-image': 'url("/assets/images/one.svg")',
        'background-color': '#888',
      })),
      state('stop', style({
        'background-image': 'url("/assets/images/rec.svg")',
        'background-color': '#888',
      })),
      state('rec', style({
        'background-image': 'url("/assets/images/stop.svg")',
        'background-color': '#f44',
      })),
      transition('rec => stop', [
        animate(400, keyframes([
          style({'background-color': '#f44', offset: 0}),
          style({'background-color': '#fff', offset: .8}),
          style({'background-color': '#888', offset: 1}),
        ]))
      ])
    ])
  ]
})
export class RecordingComponent implements OnInit {
  recordingState: string;
  mediaRecorder: any;
  recordedChunks: any[] = [];

  constructor(private sound: SoundService,
              private dispatcher: AppDispatcher,
              private actions: AppActions,
              private store: AppStore) {
  }

  ngOnInit() {
    // User Media
    // https://developers.google.com/web/updates/2016/01/mediarecorder
    navigator.getUserMedia({audio: true},
        stream => {
          this.mediaRecorder                 = new MediaRecorder(stream, {mimeType: 'audio/webm'});
          this.mediaRecorder.ondataavailable = (event: any) => {
            if (event.data.size > 0) {
              this.recordedChunks.push(event.data);
            }
          };
        },
        err => console.log('The following error occurred: ' + err.name),
    );

    // Walths
    this.store.getRecordingState().subscribe(val => {
      this.recordingState = val;

      switch (this.recordingState) {
        case 'rec':
          setTimeout(() => this.dispatcher.emit(this.actions.changeRecordingState()), 400);
          this.mediaRecorder.start();
          break;

        case 'stop':
          if (this.mediaRecorder) {

            this.mediaRecorder.stop();

            const superBuffer: Blob = new Blob(this.recordedChunks);

            // Sound URL
            const recordingSoundUrl: string = window.URL.createObjectURL(superBuffer);

            // Service
            this.sound.recording = recordingSoundUrl;

            // reset chunks
            this.recordedChunks = [];

            // PLAY Sound
            setTimeout(() => {
              const audio: HTMLAudioElement = new Audio(recordingSoundUrl);
              audio.play();
            }, 1000);
          }
          break;
      }
    });
  }

  private onClick() {

    let count       = 3;
    const countDown = setInterval(() => {

      switch (count) {
        case 3:
          this.recordingState = 'three';
          break;
        case 2:
          this.recordingState = 'two';
          break;
        case 1:
          this.recordingState = 'one';
          break;
        case 0:
          this.dispatcher.emit(this.actions.changeRecordingState());
          clearInterval(countDown);
      }

      count--;
    }, 600);
  }

}
