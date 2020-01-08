import { Component, EventEmitter, Input, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public componentPosition: number;
  public fieldSettingsForm: FormGroup;
  public isRequired: boolean;
  public makingChanges: boolean;
  public title: string;
  public totalFieldItems: number;

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

  public emitComponentRefAction(action: string, direction?: string): void {
    const data = {
      action,
      component: this.componentRef,
      direction
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
    this.title = 'Text Input';
  }

}
