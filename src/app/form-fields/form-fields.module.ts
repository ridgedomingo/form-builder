import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule , MatRadioModule } from '@angular/material';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    InputFieldComponent,
    RadioButtonComponent,
    TextAreaComponent,
    DropdownComponent,
  ],
  entryComponents: [
      CheckboxComponent,
      DropdownComponent,
      InputFieldComponent,
      RadioButtonComponent,
      TextAreaComponent
  ],
  imports: [
      BrowserModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      ReactiveFormsModule
  ],
  exports: [
      CheckboxComponent,
      InputFieldComponent,
      RadioButtonComponent,
      TextAreaComponent
  ],
  providers: []
})
export class FormFieldsModule { }

