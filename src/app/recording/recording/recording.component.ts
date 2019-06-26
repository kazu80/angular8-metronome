import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {SoundService} from '../../service/sound.service';
import {RecordingService} from '../../service/recording.service';
import {Subscription} from 'rxjs';

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
        'background-image': 'url("/assets/images/play.svg")',
        'background-color': '#888',
      })),
      state('rec', style({
        'background-image': 'url("/assets/images/rec.svg")',
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
export class RecordingComponent implements OnInit, OnDestroy {
  recordingState: string;
  mediaRecorder: any;
  recordedChunks: any[] = [];
  countDownInterval: any;
  recordingSubscription: Subscription;

  constructor(
      private soundService: SoundService,
      private recordingService: RecordingService,
  ) {
    this.recordingState = 'stop';
  }

  ngOnInit() {
    // User Media
    // https://developers.google.com/web/updates/2016/01/mediarecorder
    navigator.getUserMedia({audio: true},
        stream => {
          this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});

          this.mediaRecorder.onstop = (e) => {
            const superBuffer = new Blob(this.recordedChunks);

            // Sound URL
            const recordingSoundUrl: string = window.URL.createObjectURL(superBuffer);

            // BEAT再生用
            this.soundService.recording = recordingSoundUrl;

            // reset chunks
            this.recordedChunks = [];

            const audio: HTMLAudioElement = new Audio(recordingSoundUrl);

            // PLAY Sound
            setTimeout(() => {
              audio.play();
            }, 1000);

          };

          this.mediaRecorder.ondataavailable = (event: any) => {
            if (event.data.size > 0) {
              this.recordedChunks.push(event.data);
            }
          };
        },
        err => console.log('The following error occurred: ' + err.name),
    );

    this.recordingSubscription = this.recordingService.recording.subscribe((res: string) => {
      switch (res) {
        case 'rec':
          let count = 3;

          this.countDownInterval = setInterval(() => {
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
                this.recordingState = 'rec';

                clearInterval(this.countDownInterval);

                this.mediaRecorder.start();

                setTimeout(() => {
                      this.recordingService.switchRecording();
                    },
                    400);
            }

            count--;
          }, 600);

          break;

        case 'stop':
          clearInterval(this.countDownInterval);

          if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
          }

          this.recordingState = 'stop';

          break;
      }
    });
  }

  private onClick() {
    this.recordingService.switchRecording();
  }

  public ngOnDestroy(): void {
    this.recordingSubscription.unsubscribe();
  }
}
