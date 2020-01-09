import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-fields-base',
})
export class InputFormFieldsBaseComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  protected componentPosition: number;
  protected componentRef: any;
  protected fieldSettingsForm: FormGroup;
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
    this.fieldSettingsForm.controls.position.setValue(this.componentPosition + 1);
  }

}

