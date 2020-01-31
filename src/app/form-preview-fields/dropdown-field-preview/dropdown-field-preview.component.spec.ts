import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFieldPreviewComponent } from './dropdown-field-preview.component';

describe('DropdownFieldPreviewComponent', () => {
  let component: DropdownFieldPreviewComponent;
  let fixture: ComponentFixture<DropdownFieldPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFieldPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
