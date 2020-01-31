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
  choices?: Array<string>;
  choicesOption?: IChoicesOption;
  id: string;
  index: number;
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
  public formName: string;
  public formPreviewComponentRef: any;
  public formPreviewFieldsRef: any;
  public formTitleControl: FormControl;
  public questionnaireView: boolean;

  private componentIsDestroyed$: Subject<boolean> = new Subject();
  private formTitleCounter: number;
  private generatedForm: IGeneratedForm;
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
    return this.formQuestionnaireRef.length === 0 && this.questionnaireView;
  }

  public addField(fieldComponent: any): void {
    this.questionCounter = this.questionCounter + 1;
    const formFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldComponent);
    this.componentRef = this.formQuestionnaireRef.createComponent(formFieldComponentFactory);
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.componentPosition = this.formQuestionnaireRef.indexOf(this.componentRef);
    this.componentRef.instance.fieldType = formFieldComponentFactory.componentType.name;
    this.componentRef.instance.title = `Question ${this.questionCounter}`;
    this.componentRef.instance.fieldId = this.generateFormFieldId();
    this.formItems.push(this.componentRef);
    this.subscribeToChoicesOptionEvents();
    this.subscribeToFormFieldEvents();
    this.subscribeToFieldVisibilityActionEvents();
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

  public generateForm(): void {
    const generatedForm: IGeneratedForm = {} as IGeneratedForm;
    generatedForm.fields = this.formFields;
    generatedForm.name = this.formName;
    this.saveFormToLocalStorage(generatedForm);
  }

  public showFormPreview(): void {
    this.questionnaireView = false;
    this.changeDetectorRef.detectChanges();
    this.formItems.map((item, index) => {
      this.formQuestionnaireRef.remove(index);
    });
  }

  public showQuestionnaireView(): void {
    this.questionnaireView = true;
    this.changeDetectorRef.detectChanges();
    this.formItems.map((item, index) => {
      this.formQuestionnaireRef.insert(item);
    });
  }

  private get formFields(): Array<IFormFields> {
    const formFields: Array<IFormFields> = [];
    this.formItems.forEach(field => {
      const instance = field.instance;
      const fieldType = instance.fieldType.split('Component');
      formFields.push({
        ...(this.fieldTypeHasChoices(instance.fieldType) ? { choices: instance.currentFieldOptionsValue } : {}),
        choicesOption: instance.choicesOption,
        id: instance.fieldId,
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
    component.instance.availableFormFieldsWithChoices = this.formItems.filter(field => {
      return this.fieldTypeHasChoices(field.instance.fieldType) && field.fieldId !== component.instance.fieldId
        && field.instance.componentPosition < component.instance.componentPosition;
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
    this.generatedForm = form;
    localStorage.setItem(form.name, JSON.stringify(form));
    if (this.changesWereMade) {
      setTimeout(() => {
        this.changesWereMade = false;
      }, 350);
    }
  }

  private setFieldChoicesOption(data: any): void {
    if (Object.keys(this.generatedForm).length > 0) {
      let targetIds: Array<string> = [];
      const choicesOption: IChoicesOption = {} as IChoicesOption;
      const choicesOptionProperties: IChoicesOptionProperties = {} as IChoicesOptionProperties;
      this.generatedForm.fields.forEach(field => {
        if (field.id === data.choicesOption[0].fieldId) {
          const componentIndex = this.formItems.findIndex(item => item.instance.fieldId === field.id);
          if (field.hasOwnProperty('choicesOption')) {
            choicesOptionProperties.action = 'show';
            data.choicesOption.forEach(option => {
              if (field.choicesOption[option.index] !== undefined) {
                targetIds = field.choicesOption[option.index].targetIds;
              }
              if (!targetIds.includes(option.targetFieldId)) {
                targetIds.push(option.targetFieldId);
              }
              choicesOptionProperties.targetIds = targetIds;
              choicesOption[option.index] = choicesOptionProperties;
              field.choicesOption = choicesOption;
              data.component.instance.choicesOption = choicesOption;
              this.formItems[componentIndex].instance.choicesOption = choicesOption;
            });
          } else {
            data.choicesOption.forEach(option => {
              if (!targetIds.includes(option.targetFieldId)) {
                targetIds.push(option.targetFieldId);
              }
              choicesOptionProperties.targetIds = targetIds;
              choicesOption[option.index] = choicesOptionProperties;
              field.choicesOption = choicesOption;
              data.component.instance.choicesOption = choicesOption;
              this.formItems[componentIndex].instance.choicesOption = choicesOption;
            });
          }
        }
      });
      this.saveFormToLocalStorage(this.generatedForm);
    }
  }


  private subscribeToFieldVisibilityActionEvents(): void {
    this.componentRef.instance.showFieldVisibilityForm
      .pipe(distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$))
      .subscribe(data => {
        if (!data.fieldIsVisible) {
          this.componentRef = data.component;
          this.getFormFieldsWithChoices(data.component);
        }
      });
  }
  private subscribeToChoicesOptionEvents(): void {
    this.componentRef.instance.setFieldChoicesOption
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(data => {
        if (data.choicesOption && data.choicesOption.length > 0) {
          this.setFieldChoicesOption(data);
        }
      });
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
