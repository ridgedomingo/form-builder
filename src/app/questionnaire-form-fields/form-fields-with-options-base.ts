
import { Component, EventEmitter, Input, Renderer2, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-fields-with-options-base',
})
export class FormFieldsWithOptionsBaseComponent implements OnInit {
    @Input() set fieldData(data: any) {
        if (data) { this.setFieldData(data); }
    }
    @Input() componentPosition: number;
    @Input() formFieldVisibilityTriggers: any;
    @ViewChildren('fieldOptions') fieldOptions: QueryList<any>;
    @Output() componentAction: EventEmitter<any> = new EventEmitter();
    @Output() setFieldChoicesOption: EventEmitter<any> = new EventEmitter();
    @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
    protected alwaysShowField: boolean;
    protected choicesOption: Array<any> = [];
    protected currentFieldOptions: any;
    protected currentFieldOptionsValue: Array<string> = [];
    protected initialFieldOptions: Array<any>;
    protected fieldId: string;
    protected fieldSettingsForm: FormGroup;
    protected fieldSettingsData: any;
    protected fieldType: string;
    protected fieldVisibilityTrigger: any;
    protected finishedModifyingFieldSettings$: Subject<boolean>;
    protected isRequired: boolean;
    protected makingChanges: boolean;
    protected optionsCounter: number;
    protected title: string;
    protected updatedData: any;
    constructor(
        protected formBuilder: FormBuilder,
        protected renderer: Renderer2,
    ) {
        this.initializeForm();
    }

    ngOnInit() {
    }

    protected addOptions(): void {
        const options = this.fieldSettingsForm.controls.options as FormArray;
        this.optionsCounter = this.optionsCounter + 1;
        options.push(
            new FormControl(`Option ${this.optionsCounter}`)
        );
    }

    protected emitFieldVisibilityFormValues(values: any): void { this.showFieldVisibilityForm.emit(values); }

    protected hideFieldSettings(): void {
        this.makingChanges = false;
        this.resetFieldOptionsChoices();
        this.finishedModifyingFieldSettings$.next(true);
        this.finishedModifyingFieldSettings$.complete();
    }

    protected triggerComponentAction(action: string, direction?: string): void {
        if (action === 'show') {
            this.showFieldSettings();
        } else {
            const data = {
                action,
                currentIndex: this.componentPosition,
                fieldData: this.updatedData,
                direction,
            };
            this.componentAction.emit(data);
        }
    }

    protected removeOption(index: number): void {
        const options = this.fieldSettingsForm.controls.options as FormArray;
        options.removeAt(index);
    }

    protected setUpdatedFieldSettingsData(data: any): void {
        if (data.choicesOption.length > 0) {
            this.setFieldChoicesOption.emit(data.choicesOption);
        }
        const options = data.formValues.options as FormArray;
        const formValues = data.formValues;
        this.makingChanges = false;
        this.updatedData = {
            alwaysShowField: formValues.alwaysShowField.value,
            choices: data.formValues.options.value,
            currentFieldOptionsValue: this.currentFieldOptionsValue,
            id: this.fieldId,
            ...(data.hasOwnProperty('fieldVisibilityTrigger') ? { fieldVisibilityTrigger: data.fieldVisibilityTrigger } : {}),
            index: formValues.position.value,
            isRequired: formValues.isRequired.value,
            title: formValues.title.value,
            type: this.fieldType,
        };
        this.fieldSettingsForm.controls.options = options;
        this.triggerComponentAction('update');
        this.finishedModifyingFieldSettings$.next(true);
        this.finishedModifyingFieldSettings$.complete();
        this.finishedModifyingFieldSettings$ = null;
    }

    protected initializeForm(): void {
        this.initialFieldOptions = [
            new FormControl('Option 1'),
            new FormControl('Option 2'),
            new FormControl('Option 3'),
        ];
        this.fieldSettingsForm = this.formBuilder.group({
            alwaysShowField: [true],
            fieldVisible: [true],
            isRequired: [false],
            position: ['', Validators.required],
            options: new FormArray(this.initialFieldOptions),
            title: ['', Validators.required],
        });
        this.fieldSettingsForm.markAllAsTouched();
        const options = this.fieldSettingsForm.controls.options as FormArray;
        this.createCopyOfCurrentFieldOptions(this.initialFieldOptions);
        this.optionsCounter = options.length;
    }

    private changeComponentPosition(newPosition: number): void {
        const newComponentPosition = newPosition;
        if (newComponentPosition !== this.componentPosition + 1) {
            const direction = newComponentPosition > this.componentPosition ? 'down' : 'up';
            const placement = direction === 'down' ? newComponentPosition - 1 : this.componentPosition + 1 - newComponentPosition;
            this.componentAction.emit({
                action: 'move',
                direction,
                placement
            });
        }
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

    private setFieldData(data: any): void {
        if (data.hasOwnProperty('choices')) {
            const options = this.fieldSettingsForm.controls.options as FormArray;
            options.clear();
            Object.keys(data.choices).forEach(key => {
                options.push(new FormControl(data.choices[key]));
            });
            this.createCopyOfCurrentFieldOptions(options.controls);
            this.optionsCounter = options.length;
        }
        if (data.hasOwnProperty('choicesOption')) { this.choicesOption = data.choicesOption; }
        if (data.hasOwnProperty('fieldVisibilityTrigger')) {
            this.fieldVisibilityTrigger = data.fieldVisibilityTrigger;
        }
        this.alwaysShowField = data.alwaysShowField;
        this.fieldType = data.type;
        this.fieldId = data.id;
        this.isRequired = data.isRequired;
        this.title = data.title;
    }

    private showFieldSettings(): void {
        this.finishedModifyingFieldSettings$ = new Subject();
        this.makingChanges = true;
        this.fieldSettingsData = {
            alwaysShowField: this.alwaysShowField,
            componentPosition: this.componentPosition,
            fieldId: this.fieldId,
            ...(this.fieldVisibilityTrigger ? { fieldVisibilityTrigger: this.fieldVisibilityTrigger } : {}),
            fieldSettingsForm: this.fieldSettingsForm,
            isRequired: this.isRequired,
            title: this.title
        };
        this.setChoicesInputFieldWidth();
    }

}
