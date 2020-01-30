import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireFormFieldActionsComponent } from './questionnaire-form-field-actions.component';

describe('QuestionnaireFieldActionsComponent', () => {
  let component: QuestionnaireFormFieldActionsComponent;
  let fixture: ComponentFixture<QuestionnaireFormFieldActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireFormFieldActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( QuestionnaireFormFieldActionsComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
