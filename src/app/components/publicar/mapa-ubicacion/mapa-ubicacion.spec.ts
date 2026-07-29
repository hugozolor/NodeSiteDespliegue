import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaUbicacionComponent } from './mapa-ubicacion';

describe('MapaUbicacion', () => {
  let component: MapaUbicacionComponent;
  let fixture: ComponentFixture<MapaUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaUbicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaUbicacionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
