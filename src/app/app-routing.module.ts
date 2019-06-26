import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopComponent} from './metronome/top/top.component';
import {RecordingComponent} from './recording/recording/recording.component';

const routes: Routes = [
  {path: '', component: TopComponent},
  {path: 'recording', component: RecordingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
