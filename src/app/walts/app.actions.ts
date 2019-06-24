import {Injectable} from '@angular/core';
import {Actions, Action} from 'walts';

import {AppState} from './app.state';

@Injectable()
export class AppActions extends Actions<AppState> {

    changeRecordingState(): Action<AppState> {
        return state => {
            state.recording = state.recording === 'stop' ? 'rec' : 'stop';
            return state;
        };
    }

    setRecordingSound(url: string): Action<AppState> {
        return state => {
            state.recording_sound = url;
            return state;
        }
    }

}