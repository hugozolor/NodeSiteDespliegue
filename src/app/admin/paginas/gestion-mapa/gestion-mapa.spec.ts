import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMapa } from './gestion-mapa';

describe('GestionMapa', () => {
  let component: GestionMapa;
  let fixture: ComponentFixture<GestionMapa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMapa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMapa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
