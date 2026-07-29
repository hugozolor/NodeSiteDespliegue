import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroControl } from './tablero-control';

describe('TableroControl', () => {
  let component: TableroControl;
  let fixture: ComponentFixture<TableroControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
