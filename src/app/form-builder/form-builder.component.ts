import { Component, ComponentFactoryResolver, OnInit, OnDestroy , ViewContainerRef, ViewChild } from '@angular/core';

import { CheckboxComponent, DropdownComponent, InputFieldComponent, RadioButtonComponent, TextAreaComponent } from '../form-fields/index';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('formQuestionnaire', { static: true, read: ViewContainerRef }) formQuestionnaireRef;
  public componentRef: any;
  public formBuilderChoices: Array<any> = [];

  private componentIsDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit() {
    this.getFormBuilderChoices();
  }

  public get noSelectionMade(): boolean {
    return this.formQuestionnaireRef.length ===  0;
  }

  public addField(fieldComponent: any): void {
    const formFieldComponentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldComponent);
    this.componentRef = this.formQuestionnaireRef.createComponent(formFieldComponentFactory);
    this.componentRef.instance.componentRef = this.componentRef;
    this.subscribeToRemoveFormFieldEvents();
  }

  private subscribeToRemoveFormFieldEvents(): void {
    this.componentRef.instance.removeComponent
    .pipe(
      distinctUntilChanged(),
      takeUntil(this.componentIsDestroyed$)
    )
    .subscribe(component => {
      const componentIndex = this.formQuestionnaireRef.indexOf(component.hostView);
      this.formQuestionnaireRef.remove(componentIndex);
    });
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

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
