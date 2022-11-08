import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDynamicDataComponent } from './add-dynamic-data.component';

describe('AddDynamicDataComponent', () => {
  let component: AddDynamicDataComponent;
  let fixture: ComponentFixture<AddDynamicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDynamicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDynamicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
