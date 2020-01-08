import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-fields-base',
})
export class InputFormFieldsBaseComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
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
        direction
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
  }

  private showFieldSettings(): void {
    this.makingChanges = true;
  }

}

