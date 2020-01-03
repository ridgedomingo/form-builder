import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormBuilderComponent } from './form-builder/form-builder.component';


const routes: Routes = [
  {
    path: '',
    component: FormBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
