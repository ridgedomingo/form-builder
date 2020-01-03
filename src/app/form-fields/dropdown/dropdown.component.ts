import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public dropdownChoices: Array<string> = [
    'Dropdown Option 1',
    'Dropdown Option 2',
    'Dropdown Option 3',
  ];

  constructor() { }

  ngOnInit() {
  }

}
