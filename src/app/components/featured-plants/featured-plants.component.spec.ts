import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlantsComponent } from './featured-plants.component';

describe('FeaturedPlantsComponent', () => {
  let component: FeaturedPlantsComponent;
  let fixture: ComponentFixture<FeaturedPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPlantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
