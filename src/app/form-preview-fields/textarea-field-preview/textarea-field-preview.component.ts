import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea-field-preview',
  templateUrl: './textarea-field-preview.component.html',
  styleUrls: ['./textarea-field-preview.component.scss']
})
export class TextareaFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
