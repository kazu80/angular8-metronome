import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tempo-display',
  templateUrl: './tempo-display.component.html',
  styleUrls: ['./tempo-display.component.scss']
})
export class TempoDisplayComponent implements OnInit {
  @Input() set tempo(value: number) {
    this.tempoValue = value;
    if (this.tempoPixiText !== undefined) {
      this.tempoPixiText.text = value;
    }
  }
  @Input() runStatus: string;

  tempoPixiText: any;
  tempoValue: number;
  private dom: HTMLElement;


  constructor(el: ElementRef) {
    this.dom = el.nativeElement;
  }

  ngOnInit() {}

}
