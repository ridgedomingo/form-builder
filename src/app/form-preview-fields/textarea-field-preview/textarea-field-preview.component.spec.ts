import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFieldPreviewComponent } from './textarea-field-preview.component';

describe('TextareaFieldPreviewComponent', () => {
  let component: TextareaFieldPreviewComponent;
  let fixture: ComponentFixture<TextareaFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
