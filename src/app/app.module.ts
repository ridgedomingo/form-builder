import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionnaireFormFieldsModule } from './questionnaire-form-fields/questionnaire-form-fields.module';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

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
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    QuestionnaireFormFieldsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
