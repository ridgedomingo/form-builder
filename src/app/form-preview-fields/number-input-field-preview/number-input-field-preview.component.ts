import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-input-field-preview',
  templateUrl: './number-input-field-preview.component.html',
  styleUrls: ['./number-input-field-preview.component.scss']
})
export class NumberInputFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
