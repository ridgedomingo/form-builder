import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatMenuModule,
  MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormPreviewFieldsModule } from './form-preview-fields/form-preview-fields.module';
import { QuestionnaireFormFieldsModule } from './questionnaire-form-fields/questionnaire-form-fields.module';

import { FormBuilderComponent } from './form-builder/form-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormPreviewFieldsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    QuestionnaireFormFieldsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
