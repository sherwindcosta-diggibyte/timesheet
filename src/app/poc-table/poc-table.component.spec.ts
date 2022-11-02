import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocTableComponent } from './poc-table.component';

describe('PocTableComponent', () => {
  let component: PocTableComponent;
  let fixture: ComponentFixture<PocTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
