import { moveItemInArray } from '@angular/cdk/drag-drop';

import {
  Component, ComponentFactoryResolver, ChangeDetectorRef,
  OnInit, OnDestroy, ViewContainerRef, ViewChild, ViewEncapsulation
} from '@angular/core';

import { FormControl } from '@angular/forms';

import {
  CheckboxComponent, DropdownComponent, InputFieldComponent,
  NumberInputFieldComponent, RadioButtonComponent, TextAreaComponent
} from '../questionnaire-form-fields';

import {
  CheckboxFieldPreviewComponent, DropdownFieldPreviewComponent, InputFieldPreviewComponent,
  NumberInputFieldPreviewComponent, RadioButtonFieldPreviewComponent, TextareaFieldPreviewComponent
} from '../form-preview-fields/index';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime } from 'rxjs/operators';

interface IChoicesOptionProperties {
  action: string;
  targetIds: Array<string>;
}

interface IChoicesOption {
  [key: string]: IChoicesOptionProperties;
}
interface IFormFields {
  alwaysShowField: boolean;
  choices?: Array<string>;
  choicesOption?: IChoicesOption;
  fieldVisibilityTrigger?: any;
  id: string;
  index?: number;
  isRequired: boolean;
  title: string;
  type: string;
}

interface IGeneratedForm {
  name: string;
  fields: Array<IFormFields>;
}
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class FormBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('formQuestionnaire', { static: true, read: ViewContainerRef }) formQuestionnaireRef;
  @ViewChild('formPreview', { static: false, read: ViewContainerRef }) set formPreviewContent(content: any) {
    if (content) {
      this.formPreviewFieldsRef = content;
      this.createFieldsInFormPreview();
    }
  }
  public changesWereMade: boolean;
  public componentRef: any;
  public formBuilderChoices: Array<any> = [];
  public formItems: Array<any> = [];
  public formFieldVisibilityTriggers: any;
  public formName: string;
  public formPreviewComponentRef: any;
  public formPreviewFieldsRef: any;
  public formTitleControl: FormControl;
  public questionnaireView: boolean;

  private componentIsDestroyed$: Subject<boolean> = new Subject();
  private formTitleCounter: number;
  private initialFieldOptionsValue: Array<string> = ['Option 1', 'Option 2', 'Option 3'];
  private questionCounter: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.setPageDefaultValues();
  }

  ngOnInit() {
    this.subscribeToFormNameValueChanges();
  }

  public get noSelectionMade(): boolean {
    return this.formItems.length === 0 && this.questionnaireView;
  }

  public addField(fieldComponent: any): void {
    let fieldData: IFormFields = {} as IFormFields;
    this.questionCounter = this.questionCounter + 1;
    const formFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldComponent);
    fieldData = {
      alwaysShowField: true,
      ...(this.fieldTypeHasChoices(formFieldComponentFactory.componentType.name) ?
        { choices: this.initialFieldOptionsValue } : {}),
      id: this.generateFormFieldId(),
      isRequired: false,
      title: `Question ${this.questionCounter}`,
      type: formFieldComponentFactory.componentType.name,
    };
    this.formItems.push(fieldData);
    this.generateForm();
  }

  public clearForm(): void {
    this.formQuestionnaireRef.clear();
    this.questionCounter = 0;
  }

  public createNewForm(): void {
    this.clearForm();
    this.formTitleCounter = this.formTitleCounter + 1;
    this.formName = `Untitled Form ${this.formTitleCounter}`;
    this.formTitleControl.setValue(this.formName);
  }

  public onDropDraggedField(event: any): void {
    moveItemInArray(this.formItems, event.previousIndex, event.currentIndex);
  }

  public generateForm(): void {
    const generatedForm: IGeneratedForm = {} as IGeneratedForm;
    generatedForm.fields = this.formItems;
    generatedForm.name = this.formName;
    this.saveFormToLocalStorage(generatedForm);
  }

  public showFormPreview(): void {
    this.questionnaireView = false;
    this.changeDetectorRef.detectChanges();
    this.formItems.map((item, index) => {
      this.formQuestionnaireRef.detach(index);
    });
  }

  public showQuestionnaireView(): void {
    this.questionnaireView = true;
    this.formItems.map((item, index) => {
      this.formQuestionnaireRef.insert(item.hostView, index);
    });
  }

  private assignFieldNewIndex(): void {
    this.formItems.forEach((field, index) => {
      field.instance.componentPosition = index;
    });
    this.generateForm();
  }

  private createFieldsInFormPreview(): void {
    const form = JSON.parse(localStorage.getItem(this.formName));
    form.fields.forEach(field => {
      const component = this.getFormFieldType(field.type);
      const formFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.formPreviewComponentRef = this.formPreviewFieldsRef.createComponent(formFieldComponentFactory);
      this.formPreviewComponentRef.instance.fieldData = field;
    });
  }

  private fieldTypeHasChoices(fieldType: string): boolean {
    const fieldsWithChoices = ['RadioButtonComponent', 'DropdownComponent', 'CheckboxComponent'];
    return fieldsWithChoices.includes(fieldType);
  }

  private generateFormFieldId(): string {
    return [...Array(7)].map(() => Math.random().toString(36)[2]).join('');
  }

  private getFormFieldType(componentType: string): any {
    let component: any;
    switch (componentType) {
      case 'Checkbox':
        component = CheckboxFieldPreviewComponent;
        break;
      case 'Dropdown':
        component = DropdownFieldPreviewComponent;
        break;
      case 'InputField':
        component = InputFieldPreviewComponent;
        break;
      case 'NumberInputField':
        component = NumberInputFieldPreviewComponent;
        break;
      case 'RadioButton':
        component = RadioButtonFieldPreviewComponent;
        break;
      case 'TextArea':
        component = TextareaFieldPreviewComponent;
        break;
    }
    return component;
  }

  private getFormFieldsWithChoices(component: any): void {
    this.formFieldVisibilityTriggers = this.formItems.filter((field, index) => {
      return this.fieldTypeHasChoices(field.type) && field.id !== component.fieldId
        && index < component.componentPosition;
    });
  }

  private setPageDefaultValues(): void {
    this.questionnaireView = true;
    this.questionCounter = 0;
    this.formTitleCounter = 1;
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
    this.formName = 'Untitled Form';
    this.formTitleControl = new FormControl(this.formName);
  }

  private moveFormItemsPosition(indexToMove: number, newIndex: number): void {
    const updatedFormItems = this.formItems.splice(indexToMove, 1)[0];
    this.formItems.splice(newIndex, 0, updatedFormItems);
  }

  private saveFormToLocalStorage(form: IGeneratedForm): void {
    this.changesWereMade = true;
    localStorage.setItem(form.name, JSON.stringify(form));
    if (this.changesWereMade) {
      setTimeout(() => {
        this.changesWereMade = false;
      }, 350);
    }
  }

  private setFieldChoicesOption(data: any): void {
    let targetIds: Array<string> = [];
    const choicesOption: IChoicesOption = {} as IChoicesOption;
    const choicesOptionProperties: IChoicesOptionProperties = {} as IChoicesOptionProperties;

    this.formItems.forEach((field, index) => {
      const componentIndex = this.formItems.findIndex(item => item.id === field.id);
      if (field.id === data[0].fieldId) {
        if (field.hasOwnProperty('choicesOption')) {
          choicesOptionProperties.action = 'show';
          data.forEach(option => {
            if (field.choicesOption[option.index] !== undefined) {
              targetIds = field.choicesOption[option.index].targetIds;
            }
            if (!targetIds.includes(option.targetFieldId)) {
              targetIds.push(option.targetFieldId);
            }
            choicesOptionProperties.targetIds = targetIds;
            choicesOption[option.index] = choicesOptionProperties;
            field.choicesOption = choicesOption;
            data.choicesOption = choicesOption;
            this.formItems[componentIndex].choicesOption = choicesOption;
          });
        } else {
          data.forEach(option => {
            if (!targetIds.includes(option.targetFieldId)) {
              targetIds.push(option.targetFieldId);
            }
            choicesOptionProperties.targetIds = targetIds;
            choicesOption[option.index] = choicesOptionProperties;
            field.choicesOption = choicesOption;
            data.choicesOption = choicesOption;
            this.formItems[componentIndex].choicesOption = choicesOption;
          });
        }
      }
    });
    this.generateForm();
  }


  public subscribeToFieldVisibilityActionEvents(data: any): void {
    if (!data.fieldIsVisible) {
      this.getFormFieldsWithChoices(data);
    }
  }
  public subscribeToChoicesOptionEvents(data: any): void {
    if (data && data.length > 0) {
      this.setFieldChoicesOption(data);
    }
  }

  public subscribeToFormFieldEvents(data: any): void {
    switch (data.action) {
      case 'move':
        const newComponentPosition = data.direction === 'up' ? data.currentIndex - 1 : data.currentIndex + 1;
        moveItemInArray(this.formItems, data.currentIndex, newComponentPosition);
        break;
      case 'delete':
        this.formItems.splice(data.currentIndex, 1);
        break;
      case 'update':
        this.formItems[data.currentIndex] = data.fieldData;
        break;
    }
    this.generateForm();
  }

  private subscribeToFormNameValueChanges(): void {
    this.formTitleControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(newFormName => {
        localStorage.removeItem(this.formName);
        this.formName = newFormName;
        this.generateForm();
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
