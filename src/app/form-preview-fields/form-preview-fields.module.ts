import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {
    MatButtonModule, MatCheckboxModule, MatGridListModule,
    MatIconModule, MatInputModule, MatSelectModule, MatRadioModule
} from '@angular/material';

import { InputFieldPreviewComponent } from './input-field-preview/input-field-preview.component';
import { TextareaFieldPreviewComponent } from './textarea-field-preview/textarea-field-preview.component';
import { NumberInputFieldPreviewComponent } from './number-input-field-preview/number-input-field-preview.component';
import { RadioButtonFieldPreviewComponent } from './radio-button-field-preview/radio-button-field-preview.component';
import { DropdownFieldPreviewComponent } from './dropdown-field-preview/dropdown-field-preview.component';
import { CheckboxFieldPreviewComponent } from './checkbox-field-preview/checkbox-field-preview.component';

@NgModule({
    declarations: [
        CheckboxFieldPreviewComponent,
        DropdownFieldPreviewComponent,
        InputFieldPreviewComponent,
        NumberInputFieldPreviewComponent,
        TextareaFieldPreviewComponent,
        RadioButtonFieldPreviewComponent,
    ],
    entryComponents: [
        CheckboxFieldPreviewComponent,
        DropdownFieldPreviewComponent,
        InputFieldPreviewComponent,
        NumberInputFieldPreviewComponent,
        RadioButtonFieldPreviewComponent,
        TextareaFieldPreviewComponent,
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    exports: [],
    providers: []
})
export class FormPreviewFieldsModule { }

