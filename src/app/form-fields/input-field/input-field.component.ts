import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { InputFormFieldsBaseComponent } from '../input-form-fields-base';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent extends InputFormFieldsBaseComponent implements OnInit {
  public componentPosition: number;
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
    this.setDefaultFieldValues();
    this.initializeForm();
  }

  ngOnInit() {
  }

  private initializeForm(): void {
    this.fieldSettingsForm = this.formBuilder.group({
      fieldVisible: [true],
      isRequired: [false],
      position: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.fieldSettingsForm.markAllAsTouched();
  }

  private setDefaultFieldValues(): void {
  this.makingChanges = false;
}

}
