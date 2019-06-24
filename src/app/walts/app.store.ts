import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from 'walts';

import {AppState} from './app.state';
import {AppDispatcher} from './app.dispatcher';

const INIT_STATE: AppState = {
    recording      : 'stop',
    recording_sound: '',
};

@Injectable()
export class AppStore extends Store<AppState> {
    constructor(protected dispatcher: AppDispatcher) {
        super(INIT_STATE, dispatcher);
    }

    getRecordingState(): Observable<string> {
        return this.observable.map(state => {
            return state.recording;
        })
    }

    getRecordingSound(): Observable<string> {
        return this.observable.map(state => {
            return state.recording_sound;
        })
    }
}