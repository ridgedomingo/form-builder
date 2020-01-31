import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-field-preview',
  templateUrl: './checkbox-field-preview.component.html',
  styleUrls: ['./checkbox-field-preview.component.scss']
})
export class CheckboxFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
