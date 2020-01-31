import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputFieldPreviewComponent } from './number-input-field-preview.component';

describe('NumberInputFieldPreviewComponent', () => {
  let component: NumberInputFieldPreviewComponent;
  let fixture: ComponentFixture<NumberInputFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberInputFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
