
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { FormFieldActionsComponent } from './form-field-actions.component';

@NgModule({
  declarations: [FormFieldActionsComponent],
  imports: [
      BrowserModule,
      MatIconModule
  ],
  exports: [FormFieldActionsComponent],
  providers: []
})
export class FormFieldsActionModule { }

