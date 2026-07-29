import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinesUsuariosComponent } from './pines-usuarios';

describe('PinesUsuarios', () => {
  let component: PinesUsuariosComponent;
  let fixture: ComponentFixture<PinesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinesUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinesUsuariosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
