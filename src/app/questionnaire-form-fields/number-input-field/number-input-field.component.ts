import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';

import { InputFormFieldsBaseComponent } from '../input-form-fields-base';
@Component({
  selector: 'app-number-input-field',
  templateUrl: './number-input-field.component.html',
  styleUrls: ['./number-input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumberInputFieldComponent extends InputFormFieldsBaseComponent implements OnInit {
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
      title: ['', Validators.required],
      position: ['', Validators.required],
      isRequired: [false]
    });
    this.fieldSettingsForm.markAllAsTouched();
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
  }

}

