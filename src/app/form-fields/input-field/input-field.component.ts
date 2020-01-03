import { Component, EventEmitter, OnInit, ViewEncapsulation, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public inputFieldSettingsForm: FormGroup;
  public isRequired: boolean;
  public makingChanges: boolean;
  public title: string;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.setDefaultFieldValues();
    this.initializeForm();
  }

  ngOnInit() {
  }

  public hideInputFieldSettings(): void {
    this.makingChanges = false;
  }
  public saveInputFieldSettings(): void {
    const formControls = this.inputFieldSettingsForm.controls;
    this.makingChanges = false;
    this.title = formControls.title.value;
    this.isRequired = formControls.isRequired.value;
  }

  public removeField(): void {
    this.removeComponent.emit(this.componentRef);
  }

  public showInputFieldSettings(): void {
    this.makingChanges = true;
  }

  private initializeForm(): void {
    this.inputFieldSettingsForm = this.formBuilder.group({
      title: ['', Validators.required],
      isRequired: [false]
    });
    // this.inputFieldSettingsForm.controls.title.markAllAsTouched()
    this.inputFieldSettingsForm.markAllAsTouched();
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
    this.title = 'Text Input';
  }

}
