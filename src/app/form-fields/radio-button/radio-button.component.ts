import { Component, Renderer2, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormFieldsWithOptionsBaseComponent } from '../form-fields-with-options-base';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioButtonComponent extends FormFieldsWithOptionsBaseComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public renderer: Renderer2
  ) {
    super(formBuilder, renderer);
    this.setDefaultFieldValues();
  }

  ngOnInit() {
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
  }

}
