import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextAreaComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public isRequired: boolean;
  public title: string;

  constructor() { }

  ngOnInit() {
  }

}
