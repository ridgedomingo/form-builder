import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSettingsFormComponent } from './field-settings-form.component';

describe('FieldSettingsFormComponent', () => {
  let component: FieldSettingsFormComponent;
  let fixture: ComponentFixture<FieldSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
