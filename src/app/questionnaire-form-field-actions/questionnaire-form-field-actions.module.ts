
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { QuestionnaireFormFieldActionsComponent } from './questionnaire-form-field-actions.component';

@NgModule({
  declarations: [ QuestionnaireFormFieldActionsComponent ],
  imports: [
      BrowserModule,
      MatIconModule
  ],
  exports: [ QuestionnaireFormFieldActionsComponent ],
  providers: []
})
export class QuestionnaireFormFieldsActionModule { }

