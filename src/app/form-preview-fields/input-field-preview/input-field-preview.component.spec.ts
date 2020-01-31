import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldPreviewComponent } from './input-field-preview.component';

describe('InputFieldPreviewComponent', () => {
  let component: InputFieldPreviewComponent;
  let fixture: ComponentFixture<InputFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
