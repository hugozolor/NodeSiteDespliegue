import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinesAdminComponent } from './pines-admin';

describe('PinesAdmin', () => {
  let component: PinesAdminComponent;
  let fixture: ComponentFixture<PinesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinesAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
