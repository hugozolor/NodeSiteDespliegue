import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPin } from './popup-pin';

describe('PopupPin', () => {
  let component: PopupPin;
  let fixture: ComponentFixture<PopupPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupPin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
