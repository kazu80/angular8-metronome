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

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    TempoDisplayComponent,
    BeatComponent,
    SoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    MetronomeCommon,
    BeatService,
    SoundService,
    TempoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
