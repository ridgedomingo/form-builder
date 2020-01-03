import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-radio-button-field',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioButtonComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public isRequired: boolean;
  public radioButtonOptions: Array<string> = [];
  public title: string;

  constructor() { }

  ngOnInit() {
    this.radioButtonOptions = [
      'Option 1',
      'Option 2',
      'Option 3',
    ];
  }

}
