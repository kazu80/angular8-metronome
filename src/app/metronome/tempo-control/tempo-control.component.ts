import { Component, OnInit } from '@angular/core';
import {TempoService} from '../../service/tempo.service';

@Component({
  selector   : 'app-tempo-control',
  templateUrl: './tempo-control.component.html',
  styleUrls  : ['./tempo-control.component.scss']
})
export class TempoControlComponent implements OnInit {

  constructor(private service: TempoService) {
  }

  ngOnInit() {
  }

  public onChange(e: any) {
    this.service.tempo = e.target.value;
  }
}
