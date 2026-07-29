import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPin } from './selector-pin';

describe('SelectorPin', () => {
  let component: SelectorPin;
  let fixture: ComponentFixture<SelectorPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorPin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
