import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-settings-form',
  templateUrl: './field-settings-form.component.html',
  styleUrls: ['./field-settings-form.component.scss']
})
export class FieldSettingsFormComponent implements OnInit {
  @Input() set pageData(data: any) {
    this.setFieldValues(data);
  }
  @Input() formFieldVisibilityTriggers: any;
  @Output() fieldSettingsUpdatedData: EventEmitter<any> = new EventEmitter();
  @Output() makingChanges: EventEmitter<boolean> = new EventEmitter();
  @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
  public choicesOption: Array<any> = [];
  public componentPosition: number;
  public componentRef: any;
  public currentlySelectedField: any;
  public selectedFormFieldForFieldVisibility: any;
  public fieldId: string;
  public fieldSettingsForm: FormGroup;
  public fieldType: string;
  public fieldIsVisible: boolean;
  public isRequired: boolean;
  public title: string;


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  public hideFieldSettings(): void { this.makingChanges.emit(false); }

  public saveFieldSettings(): void {
    const fieldSettingsData = {
      choicesOption: this.choicesOption,
      formValues: this.fieldSettingsForm.controls
    };
    this.fieldSettingsUpdatedData.emit(fieldSettingsData);
  }

  public setFieldValues(data: any): void {
    if (data.hasOwnProperty('fieldSettingsForm')) {
      this.fieldSettingsForm = data.fieldSettingsForm;
    }
    this.fieldId = data.fieldId;
    this.fieldIsVisible = this.fieldSettingsForm.controls.fieldVisible.value;
    this.fieldSettingsForm.controls.position.setValue(data.componentPosition + 1);
    this.fieldSettingsForm.controls.title.setValue(data.title);
    this.componentRef = data.componentRef;
  }

  public setFormFieldTriggerForFieldVisibility(field: any): void {
    this.selectedFormFieldForFieldVisibility = field;
  }

  public setFormFieldChoicesTrigger(value: boolean, index: number): void {
    const optionIndex = index.toString();
    const fieldTrigger = {
      fieldId: this.currentlySelectedField.instance.fieldId,
      index: optionIndex,
      targetFieldId: this.fieldId,
    };
    if (value) {
      this.choicesOption.push(fieldTrigger);
    } else {
      if (this.choicesOption.some(field => field.index === optionIndex)) {
        this.choicesOption = this.choicesOption.filter(option => option.index !== optionIndex);
      }
    }
  }

  public showFieldVisibilitySettings(value: boolean): void {
    this.currentlySelectedField = this.currentlySelectedField ? this.currentlySelectedField : 'Select';
    this.fieldIsVisible = value;
    const data = {
      fieldIsVisible: value,
      component: this.componentRef
    };
    this.showFieldVisibilityForm.emit(data);
  }

  private initializeForm(): void {
    this.fieldSettingsForm = this.formBuilder.group({
      fieldVisible: [true],
      isRequired: [false],
      position: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.fieldSettingsForm.markAllAsTouched();
  }


}
