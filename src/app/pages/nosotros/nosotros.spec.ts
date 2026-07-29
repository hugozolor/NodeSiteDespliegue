import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaComponent } from './nosotros';

describe('Nosotros', () => {
  let component: GuiaComponent;
  let fixture: ComponentFixture<GuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
