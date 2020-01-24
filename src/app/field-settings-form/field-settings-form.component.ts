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
  protected componentPosition: number;
  protected componentRef: any;
  protected currentlySelectedField: any;
  protected selectedFormFieldForFieldVisibility: any;
  protected fieldId: string;
  protected fieldSettingsForm: FormGroup;
  protected fieldType: string;
  protected fieldIsVisible: boolean;
  protected isRequired: boolean;
  // protected makingChanges: boolean;
  protected title: string;


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  public hideFieldSettings(): void { this.makingChanges.emit(false); }

  public saveFieldSettings(): void {
    this.makingChanges.emit(false);
    this.fieldSettingsUpdatedData.emit(this.fieldSettingsForm.controls);
  }

  public setFieldValues(data: any): void {
    this.fieldIsVisible = this.fieldSettingsForm.controls.fieldVisible.value;
    this.fieldSettingsForm.controls.position.setValue(data.componentPosition + 1);
    this.fieldSettingsForm.controls.title.setValue(data.title);
    this.componentRef = data.componentRef;
  }

  public setFormFieldTriggerForFieldVisibility(field: any): void {
    this.selectedFormFieldForFieldVisibility = field;
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
