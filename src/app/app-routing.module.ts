import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopComponent} from './metronome/top/top.component';

const routes: Routes = [
  {path: '', component: TopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
