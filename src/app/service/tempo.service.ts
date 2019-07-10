import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class TempoService {
    private _tempo: number;
    private _animation: string;
    private _tempoSubject: Subject<number>;

    constructor() {
        this._tempo = 80;
        this._animation = 'stop';
        this._tempoSubject = new Subject();
    }

    get tempo(): number {
        return this._tempo;
    }

    set tempo(value: number) {
        this._tempo = value;
        this._tempoSubject.next(value);
    }

    get animation(): string {
        return this._animation;
    }

    set animation(value: string) {
        this._animation = value;
    }

    public inclementTempo(): void {
        this._tempo = this._tempo + 1;
        this._tempoSubject.next(this._tempo);
    }

    public declementTempo(): void {
        this._tempo = this._tempo - 1;
        this._tempoSubject.next(this._tempo);
    }

    public getTempo(): Observable<number> {
        return this._tempoSubject.asObservable();
    }
}
