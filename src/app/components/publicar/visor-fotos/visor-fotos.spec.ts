import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorFotos } from './visor-fotos';

describe('VisorFotos', () => {
  let component: VisorFotos;
  let fixture: ComponentFixture<VisorFotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorFotos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorFotos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
