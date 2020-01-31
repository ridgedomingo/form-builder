import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-field-preview',
  templateUrl: './dropdown-field-preview.component.html',
  styleUrls: ['./dropdown-field-preview.component.scss']
})
export class DropdownFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
