import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-field-actions',
  templateUrl: './form-field-actions.component.html',
  styleUrls: ['./form-field-actions.component.scss']
})
export class FormFieldActionsComponent implements OnInit {
  @Output() componentAction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public emitAction(action: string, direction?: string): void {
    const data = { action, direction };
    this.componentAction.emit(data);
  }


}
