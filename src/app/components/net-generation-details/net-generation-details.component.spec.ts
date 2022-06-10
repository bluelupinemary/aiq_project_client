import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetGenerationDetailsComponent } from './net-generation-details.component';

describe('NetGenerationDetailsComponent', () => {
  let component: NetGenerationDetailsComponent;
  let fixture: ComponentFixture<NetGenerationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetGenerationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetGenerationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
