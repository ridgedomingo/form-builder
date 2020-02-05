import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-settings-form',
  templateUrl: './questionnaire-field-settings-form.component.html',
  styleUrls: ['./questionnaire-field-settings-form.component.scss']
})
export class QuestionnaireFieldSettingsFormComponent implements OnInit {
  @Input() set pageData(data: any) {
    this.setFieldValues(data);
  }
  @Input() formFieldVisibilityTriggers: Array<any>;
  @Output() fieldSettingsUpdatedData: EventEmitter<any> = new EventEmitter();
  @Output() makingChanges: EventEmitter<boolean> = new EventEmitter();
  @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
  public alwaysShowField: boolean;
  public choicesOption: Array<any> = [];
  public choicesOptionValue: Array<string> = [];
  public componentPosition: number;
  public currentlySelectedField: any;
  public selectedFormFieldForFieldVisibility: any;
  public fieldId: string;
  public fieldSettingsForm: FormGroup;
  public fieldType: string;
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
    const fieldVisibilityTrigger = Object.assign({}, this.currentlySelectedField);
    if (this.currentlySelectedField) {
      const choicesOptionValueKey = 'choicesOptionValue';
      fieldVisibilityTrigger[choicesOptionValueKey] = this.choicesOptionValue;
    }
    const fieldSettingsData = {
      choicesOption: this.choicesOption,
      fieldVisibilityTrigger,
      formValues: this.fieldSettingsForm.controls
    };
    this.fieldSettingsUpdatedData.emit(fieldSettingsData);
  }

  public setFieldValues(data: any): void {
    if (data.hasOwnProperty('fieldSettingsForm')) {
      this.fieldSettingsForm = data.fieldSettingsForm;
    }
    if (data.hasOwnProperty('fieldVisibilityTrigger')) {
      this.currentlySelectedField = data.fieldVisibilityTrigger;
      this.selectedFormFieldForFieldVisibility = data.fieldVisibilityTrigger;
    }
    this.componentPosition = data.componentPosition;
    this.fieldId = data.fieldId;
    this.fieldSettingsForm.controls.alwaysShowField.setValue(data.alwaysShowField);
    this.fieldSettingsForm.controls.position.setValue(data.componentPosition + 1);
    this.fieldSettingsForm.controls.title.setValue(data.title);
    this.fieldSettingsForm.controls.isRequired.setValue(data.isRequired);
    this.alwaysShowField = this.fieldSettingsForm.controls.alwaysShowField.value;
  }

  public setFormFieldTriggerForFieldVisibility(field: any): void {
    this.selectedFormFieldForFieldVisibility = field;
  }

  public setFormFieldChoicesTrigger(event: any, index: number): void {
    const optionIndex = index.toString();
    const fieldTrigger = {
      fieldId: this.selectedFormFieldForFieldVisibility.id,
      index: optionIndex,
      targetFieldId: this.fieldId,
    };
    if (event.checked) {
      this.choicesOption.push(fieldTrigger);
      this.choicesOptionValue.push(event.source.value);
    } else {
      if (this.choicesOption.some(field => field.index === optionIndex)) {
        this.choicesOption = this.choicesOption.filter(option => option.index !== optionIndex);
        this.choicesOptionValue = this.choicesOptionValue.filter(option => option !== event.source.value);
      }
    }
  }

  public showFieldVisibilitySettings(value: boolean): void {
    this.currentlySelectedField = this.currentlySelectedField ? this.currentlySelectedField : 'Select';
    this.alwaysShowField = value;
    const data = {
      componentPosition: this.componentPosition,
      fieldIsVisible: value,
      fieldId: this.fieldId
    };
    this.showFieldVisibilityForm.emit(data);
  }

  private initializeForm(): void {
    this.fieldSettingsForm = this.formBuilder.group({
      alwaysShowField: [true],
      isRequired: [false],
      position: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.fieldSettingsForm.markAllAsTouched();
  }


}
