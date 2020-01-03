import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {
  @Output() removeComponent: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public fieldSettingsForm: FormGroup;
  public isRequired: boolean;
  public makingChanges: boolean;
  public title: string;

  private optionsCounter: number;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.setDefaultFieldValues();
    this.initializeForm();
  }

  ngOnInit() {
  }

  public addOptions(): void {
    const options = this.fieldSettingsForm.controls.options as FormArray;
    this.optionsCounter = this.optionsCounter + 1;
    options.push(
      new FormControl(`Option ${this.optionsCounter}`)
    );
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
      isRequired: [false],
      options: new FormArray([
        new FormControl('Option 1'),
        new FormControl('Option 2'),
        new FormControl('Option 3'),
      ]),
      title: ['', Validators.required],
    });
    this.fieldSettingsForm.markAllAsTouched();
    const options = this.fieldSettingsForm.controls.options as FormArray;
    this.optionsCounter = options.length;
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
    this.title = 'Text Input';
  }

}
