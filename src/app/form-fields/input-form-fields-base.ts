import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-fields-base',
})
export class InputFormFieldsBaseComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
  protected availableFormFieldsWithChoices: Array<any> = [];
  protected componentPosition: number;
  protected componentRef: any;
  protected currentlySelectedField: any;
  protected selectedFormFieldForFieldVisibility: any;
  protected currentlySelectedOption: any;
  protected fieldId: string;
  protected fieldSettingsForm: FormGroup;
  protected fieldType: string;
  protected fieldIsVisible: boolean;
  protected isRequired: boolean;
  protected makingChanges: boolean;
  protected title: string;

  constructor() { }

  ngOnInit() {
  }

  protected triggerComponentAction(action: string, direction?: string): void {
    if (action === 'show') {
      this.showFieldSettings();
    } else {
      const data = {
        action,
        component: this.componentRef,
        direction,
        placement: 1
      };
      this.componentAction.emit(data);
    }
  }

  protected hideFieldSettings(): void {
    this.makingChanges = false;
  }
  protected saveFieldSettings(): void {
    const formControls = this.fieldSettingsForm.controls;
    this.makingChanges = false;
    this.title = formControls.title.value;
    this.isRequired = formControls.isRequired.value;
    this.changeComponentPosition();
  }

  protected setSelectedOptionForFieldVisibility(selectedOption: any): void {
    this.currentlySelectedOption = selectedOption;
  }

  protected showFieldVisibilitySettings(value: boolean): void {
    this.currentlySelectedField = this.currentlySelectedField ? this.currentlySelectedField : 'Select';
    this.fieldIsVisible = value;
    const data = {
      fieldIsVisible: value,
      component: this.componentRef
    };
    this.showFieldVisibilityForm.emit(data);
  }

  protected getSelectedComponentToTriggerFieldVisibility(field: any): void {
    this.currentlySelectedOption = this.currentlySelectedOption ? this.currentlySelectedOption : 'Is Equal to';
    this.selectedFormFieldForFieldVisibility = field;
  }

  private changeComponentPosition(): void {
    const newComponentPosition = this.fieldSettingsForm.controls.position.value;
    if (newComponentPosition !== this.componentPosition + 1) {
      const direction = newComponentPosition > this.componentPosition ? 'down' : 'up';
      const placement = direction === 'down' ? newComponentPosition - 1 : this.componentPosition + 1 - newComponentPosition;
      this.componentAction.emit({
        action: 'move',
        component: this.componentRef,
        direction,
        placement
      });
    }
  }

  private showFieldSettings(): void {
    this.makingChanges = true;
    this.fieldIsVisible = this.fieldSettingsForm.controls.fieldVisible.value;
    this.fieldSettingsForm.controls.position.setValue(this.componentPosition + 1);
    this.fieldSettingsForm.controls.title.setValue(this.title);
  }

}

