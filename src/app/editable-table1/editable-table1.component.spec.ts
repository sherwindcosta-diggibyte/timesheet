import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTable1Component } from './editable-table1.component';

describe('EditableTable1Component', () => {
  let component: EditableTable1Component;
  let fixture: ComponentFixture<EditableTable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTable1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
