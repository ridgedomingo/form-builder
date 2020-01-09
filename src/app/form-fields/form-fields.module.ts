import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatCheckboxModule, MatGridListModule,
    MatIconModule, MatInputModule, MatSelectModule, MatRadioModule
} from '@angular/material';

import { FormFieldsActionModule } from '../form-field-actions/form-field-actions.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { NumberInputFieldComponent } from './number-input-field/number-input-field.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TextAreaComponent } from './text-area/text-area.component';

@NgModule({
    declarations: [
        CheckboxComponent,
        DropdownComponent,
        InputFieldComponent,
        NumberInputFieldComponent,
        RadioButtonComponent,
        TextAreaComponent,
    ],
    entryComponents: [
        CheckboxComponent,
        DropdownComponent,
        InputFieldComponent,
        NumberInputFieldComponent,
        RadioButtonComponent,
        TextAreaComponent
    ],
    imports: [
        BrowserModule,
        FormFieldsActionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
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

