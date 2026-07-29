import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishReviewComponent } from './publish-review';

describe('PublishReview', () => {
  let component: PublishReviewComponent;
  let fixture: ComponentFixture<PublishReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
