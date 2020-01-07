import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextAreaComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public isRequired: boolean;
  public makingChanges: boolean;
  public fieldSettingsForm: FormGroup;
  public title: string;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.setDefaultFieldValues();
    this.initializeForm();
  }

  ngOnInit() {
  }

  public hideFieldSettings(): void {
    this.makingChanges = false;
  }
  public saveFieldSettings(): void {
    const formControls = this.fieldSettingsForm.controls;
    this.makingChanges = false;
    this.title = formControls.title.value;
    this.isRequired = formControls.isRequired.value;
  }

  public emitComponentRefAction(action?: string): void {
    const data = {
      action,
      component: this.componentRef,
    };
    this.componentAction.emit(data);
  }

  public showFieldSettings(): void {
    this.makingChanges = true;
  }

  private initializeForm(): void {
    this.fieldSettingsForm = this.formBuilder.group({
      title: ['', Validators.required],
      isRequired: [false]
    });
    this.fieldSettingsForm.markAllAsTouched();
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
    this.title = 'Textarea';
  }

}
