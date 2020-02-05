import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-fields-base',
})
export class InputFormFieldsBaseComponent implements OnInit {
  @Input() set fieldData(data: any) {
    if (data) {
      this.setFieldData(data);
    }
  }
  @Input() componentPosition: number;
  @Input() formFieldVisibilityTriggers: any;
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  @Output() setFieldChoicesOption: EventEmitter<any> = new EventEmitter();
  @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
  protected alwaysShowField: boolean;
  protected choicesOption: any;
  protected currentlySelectedField: any;
  protected selectedFormFieldForFieldVisibility: any;
  protected fieldId: string;
  protected fieldSettingsForm: FormGroup;
  protected fieldSettingsData: any;
  protected fieldType: string;
  protected fieldVisibilityTrigger: any;
  protected isRequired: boolean;
  protected makingChanges: boolean;
  protected title: string;
  protected updatedData: any;

  constructor() { }

  ngOnInit() {
  }

  protected emitFieldVisibilityFormValues(values: any): void { this.showFieldVisibilityForm.emit(values); }

  protected getMakingChangesState(makingChanges: boolean): void { this.makingChanges = makingChanges; }

  protected setUpdatedFieldSettingsData(data: any): void {
    if (data.choicesOption.length > 0) {
      this.setFieldChoicesOption.emit(data.choicesOption);
    }
    const formValues = data.formValues;
    this.makingChanges = false;
    this.updatedData = {
      alwaysShowField: formValues.alwaysShowField.value,
      id: this.fieldId,
      ...(data.hasOwnProperty('fieldVisibilityTrigger') ? { fieldVisibilityTrigger: data.fieldVisibilityTrigger } : {}),
      type: this.fieldType,
      index: formValues.position.value,
      isRequired: formValues.isRequired.value,
      title: formValues.title.value,
    };
    this.triggerComponentAction('update');
  }

  protected triggerComponentAction(action: string, direction?: string): void {
    if (action === 'show') {
      this.showFieldSettings();
    } else {
      const data = {
        action,
        currentIndex: this.componentPosition,
        direction,
        fieldData: this.updatedData
      };
      this.componentAction.emit(data);
    }
  }

  private changeComponentPosition(newPosition: number): void {
    const newComponentPosition = newPosition;
    if (newComponentPosition !== this.componentPosition + 1) {
      const direction = newComponentPosition > this.componentPosition ? 'down' : 'up';
      const placement = direction === 'down' ? newComponentPosition - 1 : this.componentPosition + 1 - newComponentPosition;
      this.componentAction.emit({
        action: 'move',
        currentIndex: this.componentPosition,
        direction,
        placement
      });
    }
  }

  private setFieldData(data: any): void {
    this.alwaysShowField = data.alwaysShowField;
    this.fieldId = data.id;
    this.fieldType = data.type;
    this.isRequired = data.isRequired;
    this.title = data.title;
    if (data.hasOwnProperty('fieldVisibilityTrigger')) {
      this.fieldVisibilityTrigger = data.fieldVisibilityTrigger;
    }
  }

  private showFieldSettings(): void {
    this.makingChanges = true;
    this.fieldSettingsData = {
      alwaysShowField: this.alwaysShowField,
      componentPosition: this.componentPosition,
      fieldId: this.fieldId,
      ...(this.fieldVisibilityTrigger ? { fieldVisibilityTrigger: this.fieldVisibilityTrigger } : {}),
      isRequired: this.isRequired,
      title: this.title
    };
  }

}

