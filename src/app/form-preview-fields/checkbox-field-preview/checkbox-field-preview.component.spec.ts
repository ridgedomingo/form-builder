import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFieldPreviewComponent } from './checkbox-field-preview.component';

describe('CheckboxFieldPreviewComponent', () => {
  let component: CheckboxFieldPreviewComponent;
  let fixture: ComponentFixture<CheckboxFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
