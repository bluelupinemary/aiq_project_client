import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageDetailsComponent } from './percentage-details.component';

describe('PercentageDetailsComponent', () => {
  let component: PercentageDetailsComponent;
  let fixture: ComponentFixture<PercentageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
