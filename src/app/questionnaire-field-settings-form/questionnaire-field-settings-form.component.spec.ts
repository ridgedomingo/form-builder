import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireFieldSettingsFormComponent } from './questionnaire-field-settings-form.component';

describe('QuestionnaireFieldSettingsFormComponent', () => {
  let component: QuestionnaireFieldSettingsFormComponent;
  let fixture: ComponentFixture<QuestionnaireFieldSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireFieldSettingsFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFieldSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
