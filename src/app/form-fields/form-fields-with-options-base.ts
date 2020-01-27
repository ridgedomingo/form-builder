
import { Component, EventEmitter, Renderer2, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-fields-with-options-base',
})
export class FormFieldsWithOptionsBaseComponent implements OnInit {
    @ViewChildren('fieldOptions') fieldOptions: QueryList<any>;
    @Output() componentAction: EventEmitter<any> = new EventEmitter();
    @Output() showFieldVisibilityForm: EventEmitter<any> = new EventEmitter();
    protected availableFormFieldsWithChoices: Array<any> = [];
    protected componentPosition: number;
    protected componentRef: any;
    protected currentFieldOptions: any;
    protected currentFieldOptionsValue: Array<string> = [];
    protected currentlySelectedField: any;
    protected initialFieldOptions: any;
    protected selectedFormFieldForFieldVisibility: any;
    protected fieldId: string;
    protected fieldSettingsForm: FormGroup;
    protected fieldSettingsData: any;
    protected fieldType: string;
    protected fieldIsVisible: boolean;
    protected isRequired: boolean;
    protected makingChanges: boolean;
    protected title: string;


    protected finishedModifyingFieldSettings$: Subject<boolean>;
    protected optionsCounter: number;

    constructor(
        protected formBuilder: FormBuilder,
        protected renderer: Renderer2
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
        this.fieldSettingsData = {
            componentPosition: this.componentPosition,
            componentRef: this.componentRef,
            fieldSettingsForm: this.fieldSettingsForm,
            title: this.title
        };
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
                component: this.componentRef,
                direction,
                placement: 1
            };
            this.componentAction.emit(data);
        }
    }

    protected removeOption(index: number): void {
        const options = this.fieldSettingsForm.controls.options as FormArray;
        options.removeAt(index);
    }

    protected setUpdatedFieldSettingsData(data: any): void {
        const options = data.options as FormArray;
        this.createCopyOfCurrentFieldOptions(options.controls);
        this.title = data.title.value;
        this.isRequired = data.isRequired.value;
        this.makingChanges = false;
        this.finishedModifyingFieldSettings$.next(true);
        this.finishedModifyingFieldSettings$.complete();
        this.finishedModifyingFieldSettings$ = null;
        this.changeComponentPosition(data.position.value);
    }

    protected initializeForm(): void {
        this.initialFieldOptions = [
            new FormControl('Option 1'),
            new FormControl('Option 2'),
            new FormControl('Option 3'),
        ];
        this.fieldSettingsForm = this.formBuilder.group({
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
                component: this.componentRef,
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

    private showFieldSettings(): void {
        this.finishedModifyingFieldSettings$ = new Subject();
        this.makingChanges = true;
        this.fieldSettingsData = {
            componentPosition: this.componentPosition,
            componentRef: this.componentRef,
            fieldSettingsForm: this.fieldSettingsForm,
            title: this.title
        };
        this.setChoicesInputFieldWidth();
    }

}
