import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDynamicallyComponent } from './add-dynamically.component';

describe('AddDynamicallyComponent', () => {
  let component: AddDynamicallyComponent;
  let fixture: ComponentFixture<AddDynamicallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDynamicallyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDynamicallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
