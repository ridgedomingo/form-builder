import { Component, Renderer2, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormFieldsWithOptionsBaseComponent } from '../form-fields-with-options-base';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent extends FormFieldsWithOptionsBaseComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public renderer: Renderer2,
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
