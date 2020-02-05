import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { InputFormFieldsBaseComponent } from '../input-form-fields-base';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent extends InputFormFieldsBaseComponent implements OnInit {
  constructor(
  ) {
    super();
    this.setDefaultFieldValues();
  }

  ngOnInit() {
  }
  private setDefaultFieldValues(): void {
    this.makingChanges = false;
  }


}
