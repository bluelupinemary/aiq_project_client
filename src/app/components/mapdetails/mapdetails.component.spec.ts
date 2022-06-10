import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdetailsComponent } from './mapdetails.component';

describe('MapdetailsComponent', () => {
  let component: MapdetailsComponent;
  let fixture: ComponentFixture<MapdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
