import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroAprendizaje } from './centro-aprendizaje';

describe('CentroAprendizaje', () => {
  let component: CentroAprendizaje;
  let fixture: ComponentFixture<CentroAprendizaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroAprendizaje]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroAprendizaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
