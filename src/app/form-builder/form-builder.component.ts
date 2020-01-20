import { Component, ComponentFactoryResolver, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';

import {
  CheckboxComponent, DropdownComponent, InputFieldComponent,
  NumberInputFieldComponent, RadioButtonComponent, TextAreaComponent
} from '../form-fields/index';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
interface IFormFields {
  choices?: Array<string>;
  index: number;
  isRequired: boolean;
  title: string;
  type: string;
}

interface IGeneratedForm {
  fields: Array<IFormFields>;
}
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})


export class FormBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('formQuestionnaire', { static: true, read: ViewContainerRef }) formQuestionnaireRef;
  public componentRef: any;
  public formBuilderChoices: Array<any> = [];
  public formItems: Array<any> = [];
  public changesWereMade: boolean;

  private componentIsDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit() {
    this.getFormBuilderChoices();
  }

  public get noSelectionMade(): boolean {
    return this.formQuestionnaireRef.length === 0;
  }

  public addField(fieldComponent: any): void {
    const formFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldComponent);
    this.componentRef = this.formQuestionnaireRef.createComponent(formFieldComponentFactory);
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.componentPosition = this.formQuestionnaireRef.indexOf(this.componentRef);
    this.componentRef.instance.fieldType = formFieldComponentFactory.componentType.name;
    this.formItems.push(this.componentRef);
    this.subscribeToFormFieldEvents();
    this.saveFormToLocalStorage();
  }

  public generateForm(): void {
    this.saveFormToLocalStorage();
    const generatedForm: IGeneratedForm = {} as IGeneratedForm;
    generatedForm.fields = this.formFields;
  }

  private get formFields(): Array<IFormFields> {
    const formFields: Array<IFormFields> = [];
    this.formItems.forEach(field => {
      const instance = field.instance;
      const fieldType = instance.fieldType.split('Component');
      formFields.push({
        ...(this.fieldTypeHasChoices(instance.fieldType) ? { choices: instance.currentFieldOptionsValue } : {}),
        index: instance.componentPosition,
        isRequired: instance.isRequired ? true : false,
        title: instance.title,
        type: fieldType[0],
      });
    });
    return formFields;
  }

  private assignFieldNewIndex(): void {
    this.formItems.forEach((field, index) => {
      field.instance.componentPosition = index;
    });
    this.saveFormToLocalStorage();
  }

  private fieldTypeHasChoices(fieldType: string): boolean {
    const fieldsWithChoices = ['RadioButtonComponent', 'DropdownComponent', 'CheckboxComponent'];
    return fieldsWithChoices.includes(fieldType);
  }

  private getFormBuilderChoices(): void {
    this.formBuilderChoices = [
      {
        component: CheckboxComponent,
        icon: 'check_box',
        type: 'Checkbox',
      },
      {
        component: DropdownComponent,
        icon: 'arrow_drop_down',
        type: 'Dropdown',
      },
      {
        component: RadioButtonComponent,
        icon: 'radio_button_on',
        type: 'Radio Button',
      },
      {
        component: NumberInputFieldComponent,
        icon: 'format_list_numbered',
        type: 'Number Input',
      },
      {
        component: TextAreaComponent,
        icon: 'list',
        type: 'Textarea'
      },
      {
        component: InputFieldComponent,
        icon: 'text_fields',
        type: 'Text Input',
      },
    ];
  }

  private moveFormItemsPosition(indexToMove: number, newIndex: number): void {
    const updatedFormItems = this.formItems.splice(indexToMove, 1)[0];
    this.formItems.splice(newIndex, 0, updatedFormItems);
  }

  private saveFormToLocalStorage(): void {
    this.changesWereMade = true;
    localStorage.setItem('form', JSON.stringify(this.formFields));
    if (this.changesWereMade) {
      setTimeout(() => {
        this.changesWereMade = false;
      }, 350);
    }
  }


  private subscribeToFormFieldEvents(): void {
    this.componentRef.instance.componentAction
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(data => {
        const componentInstance = data.component;
        const componentInstanceIndex = this.formQuestionnaireRef.indexOf(componentInstance.hostView);
        switch (data.action) {
          case 'move':
            const componentPosition = data.direction === 'up' ?
              componentInstanceIndex - data.placement : componentInstanceIndex + data.placement;
            this.formQuestionnaireRef.move(componentInstance.hostView, componentPosition);
            const newComponentInstanceIndex = this.formQuestionnaireRef.indexOf(componentInstance.hostView);
            this.moveFormItemsPosition(componentInstanceIndex, newComponentInstanceIndex);
            this.assignFieldNewIndex();
            break;
          case 'delete':
            this.formQuestionnaireRef.remove(componentInstanceIndex);
            this.formItems.splice(componentInstanceIndex, 1);
            this.assignFieldNewIndex();
            break;
        }
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
