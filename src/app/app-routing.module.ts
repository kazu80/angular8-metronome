import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopComponent} from './metronome/top/top.component';
import {RecordingComponent} from './recording/recording/recording.component';
import {Top8Component} from './metronome8/top8/top8.component';
import {Play8Component} from './metronome8/play8/play8.component';

const routes: Routes = [
  {path: '', component: TopComponent},
  {path: 'recording', component: RecordingComponent},
  {path: 'version8', component: Top8Component},
  {path: 'version8/play', component: Play8Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
