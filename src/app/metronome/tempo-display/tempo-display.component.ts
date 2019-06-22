import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tempo-display',
  templateUrl: './tempo-display.component.html',
  styleUrls: ['./tempo-display.component.scss']
})
export class TempoDisplayComponent implements OnInit {
  @Input() tempo: number;
  @Input() runStatus: string;


  constructor() { }

  ngOnInit() {
  }

}
