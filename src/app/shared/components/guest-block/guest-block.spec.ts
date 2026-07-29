import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBlock } from './guest-block';

describe('GuestBlock', () => {
  let component: GuestBlock;
  let fixture: ComponentFixture<GuestBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
