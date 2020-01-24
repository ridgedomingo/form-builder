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
  protected fieldId: string;
  protected fieldSettingsForm: FormGroup;
  protected fieldSettingsData: any;
  protected fieldType: string;
  protected fieldIsVisible: boolean;
  protected isRequired: boolean;
  protected makingChanges: boolean;
  protected title: string;

  constructor() { }

  ngOnInit() {
  }

  protected emitFieldVisibilityFormValues(values: any): void { this.showFieldVisibilityForm.emit(values); }

  protected getMakingChangesState(makingChanges: boolean): void { this.makingChanges = makingChanges; }

  protected setUpdatedFieldSettingsData(data: any): void {
    this.title = data.title.value;
    this.isRequired = data.isRequired.value;
    this.changeComponentPosition(data.position.value);
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

  private changeComponentPosition(newPosition: number): void {
    const newComponentPosition = newPosition;
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
    this.fieldSettingsData = {
      componentPosition: this.componentPosition,
      componentRef: this.componentRef,
      title: this.title
    };
  }

}

