import { Component, EventEmitter, Renderer2, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadioButtonComponent implements OnInit {
  @ViewChildren('fieldOptions') fieldOptions: QueryList<any>;
  @Output() componentAction: EventEmitter<any> = new EventEmitter();
  public componentRef: any;
  public currentFieldOptions: any;
  public currentFieldOptionsValue: Array<string> = [];
  public fieldSettingsForm: FormGroup;
  public initialFieldOptions: any;
  public inputValueLength: number;
  public isRequired: boolean;
  public makingChanges: boolean;
  public title: string;

  private finishedModifyingFieldSettings$: Subject<boolean>;
  private optionsCounter: number;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2
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
    this.resetFieldOptionsChoices();
    this.finishedModifyingFieldSettings$.next(true);
    this.finishedModifyingFieldSettings$.complete();
  }

  public emitComponentRefAction(action?: string): void {
    const data = {
      action,
      component: this.componentRef,
    };
    this.componentAction.emit(data);
  }

  public removeOption(index: number): void {
    const options = this.fieldSettingsForm.controls.options as FormArray;
    options.removeAt(index);
  }

  public saveFieldSettings(): void {
    const formControls = this.fieldSettingsForm.controls;
    const options = this.fieldSettingsForm.controls.options as FormArray;
    this.createCopyOfCurrentFieldOptions(options.controls);
    this.makingChanges = false;
    this.title = formControls.title.value;
    this.isRequired = formControls.isRequired.value;
    this.finishedModifyingFieldSettings$.next(true);
    this.finishedModifyingFieldSettings$.complete();
    this.finishedModifyingFieldSettings$ = null;
  }

  public showFieldSettings(): void {
    this.finishedModifyingFieldSettings$ = new Subject();
    this.makingChanges = true;
    this.setChoicesInputFieldWidth();
  }

  private initializeForm(): void {
    this.initialFieldOptions = [
      new FormControl('Option 1'),
      new FormControl('Option 2'),
      new FormControl('Option 3'),
    ];
    this.fieldSettingsForm = this.formBuilder.group({
      isRequired: [false],
      options: new FormArray(this.initialFieldOptions),
      title: ['', Validators.required],
    });
    this.fieldSettingsForm.markAllAsTouched();
    const options = this.fieldSettingsForm.controls.options as FormArray;
    this.createCopyOfCurrentFieldOptions(this.initialFieldOptions);
    this.optionsCounter = options.length;
  }

  private createCopyOfCurrentFieldOptions(fieldOptions: any): void {
    this.currentFieldOptions = [];
    this.currentFieldOptionsValue = [];
    fieldOptions.map(option => {
      this.currentFieldOptions.push(option);
      this.currentFieldOptionsValue.push(option.value);
    });
  }

  private resetFieldOptionsChoices(): void {
    const options = this.fieldSettingsForm.controls.options as FormArray;
    options.clear();
    this.currentFieldOptions.forEach(option => {
      options.push(option);
    });
    options.setValue(this.currentFieldOptionsValue);
  }

  private setChoicesInputFieldWidth(): void {
    this.fieldOptions.changes
      .pipe(takeUntil(this.finishedModifyingFieldSettings$))
      .subscribe(options => {
        options.toArray().forEach(option => {
          this.renderer.setStyle(option.nativeElement, 'width', `${option.nativeElement.value.length}ch`);
          const inputKeyUp = fromEvent(option.nativeElement, 'keyup');
          inputKeyUp.pipe(
            distinctUntilChanged(),
            debounceTime(1000)
          )
            .subscribe((event: {
              srcElement: any,
              target: any
            }) => {
              this.renderer.setStyle(event.srcElement, 'width', `${event.target.value.length}ch`);
            });
        });
      });
  }

  private setDefaultFieldValues(): void {
    this.makingChanges = false;
    this.title = 'Radio button';
  }

}
