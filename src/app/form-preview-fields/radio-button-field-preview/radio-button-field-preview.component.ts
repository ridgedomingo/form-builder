import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-button-field-preview',
  templateUrl: './radio-button-field-preview.component.html',
  styleUrls: ['./radio-button-field-preview.component.scss']
})
export class RadioButtonFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
