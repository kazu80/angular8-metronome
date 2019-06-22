import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './metronome/top/top.component';
import { TempoDisplayComponent } from './metronome/tempo-display/tempo-display.component';
import { BeatComponent } from './metronome/beat/beat.component';
import { SoundComponent } from './metronome/sound/sound.component';
import {MetronomeCommon} from './common/metronome.common';
import {SoundService} from './service/sound.service';
import {BeatService} from './service/beat.service';
import {TempoService} from './service/tempo.service';
import { TempoControlComponent } from './metronome/tempo-control/tempo-control.component';
import { TempoControlButtonComponent } from './metronome/tempo-control-button/tempo-control-button.component';
import { VolumeComponent } from './metronome/volume/volume.component';
import { RunComponent } from './metronome/run/run.component';
import {VolumeService} from './service/volume.service';
import {CounterService} from './service/counter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    TempoDisplayComponent,
    BeatComponent,
    SoundComponent,
    TempoControlComponent,
    TempoControlButtonComponent,
    VolumeComponent,
    RunComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    MetronomeCommon,
    BeatService,
    SoundService,
    TempoService,
    VolumeService,
    CounterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
