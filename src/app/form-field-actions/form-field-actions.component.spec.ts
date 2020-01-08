import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldActionsComponent } from './form-field-actions.component';

describe('FormFieldActionsComponent', () => {
  let component: FormFieldActionsComponent;
  let fixture: ComponentFixture<FormFieldActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
