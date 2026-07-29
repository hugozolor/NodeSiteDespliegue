import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesApp } from './notificaciones-app';

describe('NotificacionesApp', () => {
  let component: NotificacionesApp;
  let fixture: ComponentFixture<NotificacionesApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
