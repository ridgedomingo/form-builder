import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public checkboxOptions: Array<string> = [
    'Option 1',
    'Option 2',
  ];
  public componentRef: any;
  public isRequired: boolean;
  public title: string;

  constructor() { }

  ngOnInit() {
  }

}
