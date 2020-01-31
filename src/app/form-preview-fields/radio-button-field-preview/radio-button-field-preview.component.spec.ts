import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonFieldPreviewComponent } from './radio-button-field-preview.component';

describe('RadioButtonFieldPreviewComponent', () => {
  let component: RadioButtonFieldPreviewComponent;
  let fixture: ComponentFixture<RadioButtonFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
