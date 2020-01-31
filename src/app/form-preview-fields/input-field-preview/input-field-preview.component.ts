import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-field-preview',
  templateUrl: './input-field-preview.component.html',
  styleUrls: ['./input-field-preview.component.scss']
})
export class InputFieldPreviewComponent implements OnInit {
  @Input() set fieldData(data: any) {
    this.field = data;
  }
  public field: any;

  constructor() { }

  ngOnInit() {
  }

}
