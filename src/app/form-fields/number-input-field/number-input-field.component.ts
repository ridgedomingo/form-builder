import { Component, EventEmitter, OnInit, ViewEncapsulation, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-number-input-field',
  templateUrl: './number-input-field.component.html',
  styleUrls: ['./number-input-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumberInputFieldComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public fieldSettingsForm: FormGroup;
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

  public hideFieldSettings(): void {
    this.makingChanges = false;
  }
  public saveFieldSettings(): void {
    const formControls = this.fieldSettingsForm.controls;
    this.makingChanges = false;
    this.title = formControls.title.value;
    this.isRequired = formControls.isRequired.value;
  }

  public removeField(): void {
    this.removeComponent.emit(this.componentRef);
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
    this.title = 'Number Input';
  }

}

