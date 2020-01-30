import { Component, Renderer2, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormFieldsWithOptionsBaseComponent } from '../form-fields-with-options-base';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent extends FormFieldsWithOptionsBaseComponent implements OnInit {
  public currentlySelected: string;
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
    this.currentlySelected = 'Option 1';
  }

}
