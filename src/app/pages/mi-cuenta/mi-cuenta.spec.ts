import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaComponent } from './mi-cuenta';

describe('MiCuenta', () => {
  let component: MiCuentaComponent;
  let fixture: ComponentFixture<MiCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
