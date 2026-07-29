import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoAdmin } from './acceso-admin';

describe('AccesoAdmin', () => {
  let component: AccesoAdmin;
  let fixture: ComponentFixture<AccesoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
